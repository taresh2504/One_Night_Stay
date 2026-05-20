from django.db import models
import re 
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

    name = models.CharField(max_length=100)

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

    def clean(self):
        errors = {}

        # USERNAME
        username = self.username.strip() if self.username else ""
        if not username:
            errors['username'] = "Username required"
        elif not re.match(r'^[A-Za-z ]+$', username):
            errors['username'] = "Only alphabets allowed"
        elif len(username) < 4:
            errors['username'] = "Min 4 characters required"

        # EMAIL
        if not self.email.lower().endswith("@gmail.com"):
            errors['email'] = "Only Gmail allowed"
        else:
            if User.objects.filter(email=self.email).exclude(id=self.id).exists():
                errors['email'] = "User already exists — Go Login"
    
        # PASSWORD
        pwd = self.password
        if len(pwd) < 8 or len(pwd) > 15:
            errors['password'] = "Password 8–15 characters"

        if not re.search(r'[A-Z]', pwd):
            errors['password'] = "At least 1 capital letter"

        if not re.search(r'[a-z]', pwd):
            errors['password'] = "At least 1 small letter"

        if not re.search(r'[0-9]', pwd):
            errors['password'] = "At least 1 number"

        if not re.search(r'[@#$%^&*]', pwd):
            errors['password'] = "At least 1 special character"

        # CONTACT
        if not re.match(r'^[6-9]\d{9}$', self.contact):
            errors['contact'] = "Invalid mobile number"

        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username


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

    bedrooms = models.IntegerField()

    bathrooms = models.IntegerField()

    description = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):

        if self.owner.role != 'host' or self.owner.host_status != 'approved':
            raise ValueError(
                "Only approved hosts can add properties."
            )

        super().save(*args, **kwargs)

# Multiple Images Model
class PropertyImage(models.Model):

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='images'
    )

    image = models.ImageField(
        upload_to='property_images/'
    )

    image_type = models.CharField(
        max_length=50,
        choices=[
            ('hall', 'Hall'),
            ('bedroom', 'Bedroom'),
            ('bathroom', 'Bathroom'),
            ('washroom', 'Washroom'),
            ('kitchen', 'Kitchen'),
            ('exterior', 'Exterior')
        ]
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

    def save(self, *args, **kwargs):

        if self.user.role == 'host':
            raise ValidationError(
                "Hosts cannot create bookings."
            )

        if self.check_out <= self.check_in:
            raise ValidationError(
                "Check-out date must be after check-in date."
            )

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

    rating = models.IntegerField()

    comment = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):

        if self.rating < 1 or self.rating > 5:
            raise ValidationError(
                "Rating must be between 1 and 5."
            )

        if self.user == self.property.owner:
            raise ValidationError(
                "You cannot review your own property."
            )

        super().save(*args, **kwargs)