from django.db import models
from django.contrib.auth.models import AbstractUser


# class User(AbstractUser):
#     phone = models.CharField(max_length=15)
#     is_host = models.BooleanField(default=False)
#     is_admin = models.BooleanField(default=False)
#     HOST_STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('approved', 'Approved'),
#         ('rejected', 'Rejected'),
#     ]
#     host_status = models.CharField(
#         max_length=20,
#         choices=HOST_STATUS_CHOICES,
#         null=True,
#         blank=True
#     )
#     created_at = models.DateTimeField(auto_now_add=True)


# class Property(models.Model):
#     owner = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE,
#         related_name='properties'
#     )
#     title = models.CharField(max_length=255)
#     location = models.CharField(max_length=255)
#     price = models.DecimalField(
#         max_digits=10,
#         decimal_places=2
#     )
#     bedrooms = models.IntegerField()
#     bathrooms = models.IntegerField()
#     description = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title
    

# class Booking(models.Model):
#     BOOKING_STATUS = [
#         ('pending', 'Pending'),
#         ('confirmed', 'Confirmed'),
#         ('cancelled', 'Cancelled'),
#     ]
#     user = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE
#     )
#     property = models.ForeignKey(
#         Property,
#         on_delete=models.CASCADE
#     )
#     check_in = models.DateField()
#     check_out = models.DateField()
#     total_price = models.DecimalField(
#         max_digits=10,
#         decimal_places=2
#     )
#     booking_status = models.CharField(
#         max_length=20,
#         choices=BOOKING_STATUS,
#         default='pending'
#     )
#     created_at = models.DateTimeField(auto_now_add=True)


# class Review(models.Model):
#     user = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE
#     )
#     property = models.ForeignKey(
#         Property,
#         on_delete=models.CASCADE
#     )
#     rating = models.IntegerField()
#     comment = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)            