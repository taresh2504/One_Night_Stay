from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError


class User(AbstractUser):

    username = None

    ROLE_CHOICES = [
        ('user', 'User'),
        ('host', 'Host'),
        ('admin', 'Admin'),
    ]

    HOST_STATUS_CHOICES = [
        ('none', 'Not Applied'),
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    name = models.CharField(
        max_length=100
    )

    email = models.EmailField(
        unique=True
    )

    phone = models.CharField(
        max_length=15,
        unique=True
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='user'
    )

    host_status = models.CharField(
        max_length=20,
        choices=HOST_STATUS_CHOICES,
        default='none'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['name', 'phone']

    def __str__(self):
        return self.email


class Property(models.Model):

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='properties'
    )

    title = models.CharField(
        max_length=255
    )

    location = models.CharField(
        max_length=255
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    bedrooms = models.PositiveIntegerField()

    bathrooms = models.PositiveIntegerField()

    description = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def clean(self):

        if (
            self.owner.role != 'host'
            or
            self.owner.host_status != 'approved'
        ):
            raise ValidationError({
                'owner':
                'Only approved hosts can add properties.'
            })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)



class PropertyImage(models.Model):

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='images'
    )

    image = models.ImageField(
        upload_to='property_images/'
    )

    IMAGE_TYPE_CHOICES = [
        ('hall', 'Hall'),
        ('bedroom', 'Bedroom'),
        ('bathroom', 'Bathroom'),
        ('washroom', 'Washroom'),
        ('kitchen', 'Kitchen'),
        ('exterior', 'Exterior'),
    ]

    image_type = models.CharField(
        max_length=50,
        choices=IMAGE_TYPE_CHOICES
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )



class Booking(models.Model):

    BOOKING_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='bookings'
    )

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='bookings'
    )

    check_in = models.DateField()

    check_out = models.DateField()

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    booking_status = models.CharField(
        max_length=20,
        choices=BOOKING_STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def clean(self):

        errors = {}

        if self.user.role == 'host':
            errors['user'] = (
                "Hosts cannot create bookings."
            )

        if self.check_out <= self.check_in:
            errors['check_out'] = (
                "Check-out must be after check-in."
            )

        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)



class Review(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    rating = models.PositiveSmallIntegerField()

    comment = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def clean(self):

        errors = {}

        if not (1 <= self.rating <= 5):
            errors['rating'] = (
                "Rating must be between 1 and 5."
            )

        if self.user == self.property.owner:
            errors['user'] = (
                "You cannot review your own property."
            )

        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)