from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import ValidationError
from cloudinary.models import CloudinaryField

class UserManager(BaseUserManager):

    def create_user(self, email, name, phone, password=None, **extra_fields):

        if not email:
            raise ValueError('Email is required')

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            name=name,
            phone=phone,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        return user


    def create_superuser(self, email, name, phone, password=None, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')

        return self.create_user(
            email, name, phone, password, **extra_fields
        )

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
        max_length=10,
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

    objects = UserManager()

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

    PROPERTY_TYPE_CHOICES = [
        ('room', 'Room'),
        ('flat', 'Flat'),
        ('hotel', 'Hotel'),
        ('resort', 'Resort'),
        ('bungalow', 'Bungalow'),
    ]

    property_type = models.CharField(
    max_length=20,
    choices=PROPERTY_TYPE_CHOICES
    )

    max_guests = models.PositiveIntegerField()

    beds = models.PositiveIntegerField()

    is_featured = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def clean(self):

        errors = {}

        if (
            self.owner.role != 'host'
            or
            self.owner.host_status != 'approved'
        ):
            errors['owner'] = (
                'Only approved hosts can add properties.'
            )

        if self.price <= 0:
            errors['price'] = (
                'Price must be greater than zero.'
            )

        if self.bedrooms <= 0:
            errors['bedrooms'] = (
                'Bedrooms must be greater than zero.'
            )

        if self.bathrooms <= 0:
            errors['bathrooms'] = (
                'Bathrooms must be greater than zero.'
            )

        if self.beds <= 0:
            errors['beds'] = (
                'Beds must be greater than zero.'
            )

        if self.max_guests <= 0:
            errors['max_guests'] = (
                'Max guests must be greater than zero.'
            )

        if errors:
            raise ValidationError(errors)


class PropertyImage(models.Model):

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='images'
    )

    # image = models.ImageField(
    #     upload_to='property_images/'
    # )

    image = CloudinaryField(
    'image'
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

    guests_count = models.PositiveIntegerField()

    tax_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )
    
    def clean(self):

        errors = {}

        if self.user == self.property.owner:
            errors['user'] = (
                "You cannot book your own property."
            )

        if self.total_price <= 0:
            errors['total_price'] = (
                "Total price must be greater than zero."
            )    

        if self.tax_amount < 0:
            errors['tax_amount'] = (
                "Tax cannot be negative."
            )

        if self.check_out <= self.check_in:
            errors['check_out'] = (
                "Check-out must be after check-in."
            )

        existing_booking = Booking.objects.filter(
        property=self.property,
        booking_status='confirmed',
        check_in__lt=self.check_out,
        check_out__gt=self.check_in
    ).exclude(pk=self.pk)

        if existing_booking.exists():
            errors['property'] = (
                "Property already booked for selected dates."
            )

        if self.guests_count <= 0:
            errors['guests_count'] = (
                "Guests must be at least 1."
            )    

        if self.guests_count > self.property.max_guests:
            errors['guests_count'] = (
                "Guest limit exceeded."
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

class SubscriptionPlan(models.Model):

    name = models.CharField(
        max_length=50
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    booking_limit = models.PositiveIntegerField()

    property_limit = models.PositiveIntegerField()

    priority = models.PositiveIntegerField()

    description = models.TextField()

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

class UserSubscription(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    plan = models.ForeignKey(
        SubscriptionPlan,
        on_delete=models.CASCADE
    )

    start_date = models.DateTimeField(
        auto_now_add=True
    )

    end_date = models.DateTimeField()

    is_active = models.BooleanField(
        default=True
    )

class Payment(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    booking = models.OneToOneField(
        Booking,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    razorpay_order_id = models.CharField(
        max_length=255
    )

    razorpay_payment_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    razorpay_signature = models.CharField(
        max_length=500,
        blank=True,
        null=True
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    payment_status = models.CharField(
        max_length=20,
        default='pending'
    )

    paid_at = models.DateTimeField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )                