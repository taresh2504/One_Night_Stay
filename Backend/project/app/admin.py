from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(SubscriptionPlan)
admin.site.register(UserSubscription)
admin.site.register(Property)
admin.site.register(PropertyImage)
admin.site.register(Booking)
admin.site.register(Payment)
admin.site.register(Wishlist)
admin.site.register(Review)
