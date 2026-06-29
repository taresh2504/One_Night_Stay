from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import *
import re
from datetime import date
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    cpassword = serializers.CharField(write_only=True)
    class Meta:
        model = User

        fields = [
            'id',
            'name',
            'email',
            'phone',
            'password',
            'cpassword',
            'role',
            'host_status',
            'created_at'
        ]

        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

        read_only_fields = [
            'id',
            'role',
            'host_status',
            'created_at'
        ]

    def validate_name(self, value):     

        if len(value.strip()) < 4:
            raise serializers.ValidationError("Minimum 4 characters required.")

        if not re.match(r'^[A-Za-z ]+$', value):
            raise serializers.ValidationError("Only alphabets allowed.")

        return value

    def validate_email(self, value):

        if not value.lower().endswith("@gmail.com"):
            raise serializers.ValidationError("Only Gmail allowed.")

        return value

    def validate_phone(self, value):

        if not re.match(r'^[6-9]\d{9}$', value):
            raise serializers.ValidationError("Invalid mobile number please enter number in digits.")

        return value

    def validate_password(self, value):

        if not value:
            raise serializers.ValidationError("Password cannot be empty.")

        if len(value) < 8 or len(value) > 15:
            raise serializers.ValidationError("Password must be between 8 and 15 characters.")

        
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")

        
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")

        
        if not re.search(r'[0-9]', value):
            raise serializers.ValidationError("Password must contain at least one numeric value.")

        
        if not re.search(r'[*/+\-!@#$%&^]', value):
            raise serializers.ValidationError("Password must contain at least one special character.")

        return value

    def validate(self, data):

        if data.get('password') != data.get('cpassword'):
            raise serializers.ValidationError({
                'cpassword':
                'Password and Confirm Password do not match.'
            })

        return data

    def create(self, validated_data):

        validated_data.pop('cpassword')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField() 


class PropertyImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PropertyImage

        fields = [
            'id',
            'property',
            'image',
            'image_type',
            'uploaded_at'
        ]

        read_only_fields = [
            'id',
            'uploaded_at'
        ]

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None

    
    def validate_image(self, value):

        if not value:
            raise serializers.ValidationError("Image is required.")

        
        allowed_extensions = [
            '.jpg',
            '.jpeg',
            '.png',
            '.webp'
        ]

        file_name = value.name.lower()

        if not any(
            file_name.endswith(ext)
            for ext in allowed_extensions
        ):
            raise serializers.ValidationError("Only JPG, JPEG, PNG, WEBP files allowed.")

        
        max_size = 2 * 1024 * 1024

        if value.size > max_size:
            raise serializers.ValidationError("Image size must not exceed 2 MB.")
       
        return value     
       
 
class PropertySerializer(serializers.ModelSerializer):
    host_name = serializers.CharField(source="owner.name",read_only=True)
    images = PropertyImageSerializer(many=True,read_only=True)

    class Meta:
        model = Property
        # fields = "__all__"

        fields = [
            'id',
            'owner',
            'host_name',
            'title',
            'location',
            'price',
            'bedrooms',
            'bathrooms',
            'description',
            'property_type',
            'max_guests',
            'beds',
            'is_featured',
            'created_at',
            'images'
        ]

        read_only_fields = [
            'id',
            'created_at',
            'owner',
            'host_name'
        ]

    
    def validate_title(self, value):

        if len(value.strip()) < 5:
            raise serializers.ValidationError("Title must be at least 5 characters.")

        return value

    
    def validate_location(self, value):

        if len(value.strip()) < 3:
            raise serializers.ValidationError("Location is too short.")

        return value
    
    
    def validate_description(self, value):

        if len(value.strip()) < 20:
            raise serializers.ValidationError("Description must be at least 20 characters.")

        return value

    # PRICE VALIDATION
    # def validate_price(self, value):

    #     if value <= 0:
    #         raise serializers.ValidationError(
    #             "Price must be greater than 0."
    #         )

    #     return value

    # OBJECT LEVEL VALIDATION
    # def validate(self, data):

    #     if data.get('bedrooms', 0) <= 0:
    #         raise serializers.ValidationError({
    #             'bedrooms':
    #             'Bedrooms must be at least 1.'
    #         })

    #     if data.get('bathrooms', 0) < 0:
    #         raise serializers.ValidationError({
    #             'bathrooms':
    #             'Bathrooms cannot be negative.'
    #         })

    #     return data
       
    

class BookingSerializer(serializers.ModelSerializer):
    property_title = serializers.CharField(source='property.title',read_only=True)
    property_location = serializers.CharField(source='property.location',read_only=True)
    property_type = serializers.CharField(source='property.property_type',read_only=True)
    user_name = serializers.CharField(source="user.name",read_only=True)
    user_email = serializers.EmailField(source="user.email",read_only=True)

    class Meta:
        model = Booking
        fields="__all__"

        fields = [
            'id',
            'user',
            'user_name',
            'user_email',
            'property',
            'property_title',
            'property_location',
            'property_type',
            'check_in',
            'check_out',
            'total_price',
            'guests_count',
            'booking_status',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'created_at',
            'user',
            'total_price',
            'booking_status'
        ]

    def validate_check_in(self, value):

        if value < date.today():
            raise serializers.ValidationError("Check-in date cannot be in the past.")

        return value

    def validate(self, data):

        errors = {}

        request = self.context.get('request')
        user = request.user if request else None
        property_obj = data.get('property')
        guests_count = data.get('guests_count')
        check_in = data.get('check_in')
        check_out = data.get('check_out')

        if (
            property_obj
            and guests_count
            and guests_count > property_obj.max_guests
        ):
            errors['guests_count'] = (
                "Guest limit exceeded."
            )

            if errors:
                raise serializers.ValidationError(errors)

            return data

        if (
            user
            and property_obj
            and user == property_obj.owner
        ):
            errors['user'] = (
                "You cannot book your own property."
            )

        if (
            check_in
            and check_out
            and check_out <= check_in
        ):
            errors['check_out'] = (
                "Check-out must be after check-in."
            )

        if errors:
            raise serializers.ValidationError(errors)

        return data
    

class ReviewSerializer(serializers.ModelSerializer):
    property_title = serializers.CharField(source='property.title',read_only=True)
    user_name = serializers.CharField(source="user.name",read_only=True)
    property_location = serializers.CharField(source='property.location',read_only=True)
    user_name = serializers.CharField(source="user.name",read_only=True)
    property_title = serializers.CharField(source="property.title",read_only=True)
    property_location = serializers.CharField(source="property.location",read_only=True)

    class Meta:
        model = Review
        fields="__all__"

        fields = [
            'id',
            'user',
            "user_name",
            'property',
            'property_title',
            'property_location',
            'rating',
            'comment',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'created_at',
            'user'
        ]

    def validate_comment(self, value):

        if len(value.strip()) < 5:
            raise serializers.ValidationError("Feedback must contain at least 5 characters.")

        return value
    

    
class SubscriptionPlanSerializer(serializers.ModelSerializer):

    class Meta:
        model = SubscriptionPlan

        fields = [
            'id',
            'name',
            'price',
            'booking_limit',
            'property_limit',
            'priority',
            'description',
            'is_active',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'created_at'
        ]

    def validate_name(self, value):

        if len(value.strip()) < 3:
            raise serializers.ValidationError("Plan name is too short.")

        return value

    def validate_description(self, value):

        if len(value.strip()) < 10:
            raise serializers.ValidationError("Description must contain at least 10 characters.")

        return value
    


class UserSubscriptionSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.name",read_only=True)
    user_email = serializers.CharField(source="user.email",read_only=True)
    plan_name = serializers.CharField(source="plan.name",read_only=True)

    class Meta:

        model = UserSubscription

        fields = [
            "id",
            "user",
            "user_name",
            "user_email",
            "plan",
            "plan_name",
            "start_date",
            "end_date",
            "is_active",
            "approval_status",
        ]

        read_only_fields = [
            "id",
            "user",
            "start_date",
            "end_date",
            "approval_status",
        ]

    def validate_end_date(self, value):

        if value <= timezone.now():
            raise serializers.ValidationError("End date must be in the future.")

        return value
        

# class PaymentSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:

#         model = Payment

#         fields = [
#             'id',
#             'user',
#             'booking',
#             'razorpay_order_id',
#             'razorpay_payment_id',
#             'razorpay_signature',
#             'amount',
#             'payment_status',
#             'paid_at',
#             'created_at'
#         ]

#         read_only_fields = [
#             'id',
#             'created_at'
#         ]

#     def validate_amount(self, value):

#         if value <= 0:

#             raise serializers.ValidationError(
#                 "Amount must be greater than zero."
#             )

#         return value      

#     def validate(self, data):

#         status = data.get('payment_status')

#         if status == 'success':

#             if not data.get('razorpay_payment_id'):

#                 raise serializers.ValidationError({
#                     'razorpay_payment_id':
#                     'Required for successful payment.'
#                 })

#             if not data.get('razorpay_signature'):

#                 raise serializers.ValidationError({
#                     'razorpay_signature':
#                     'Required for successful payment.'
#                 })

#         return data  

class PaymentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="booking.user.name",read_only=True)
    property_title = serializers.CharField(source="booking.property.title",read_only=True)
    property_location = serializers.CharField(source="booking.property.location",read_only=True)

    class Meta:

        model = Payment
        fields="__all__"

        fields = [
        'id',
        'user',
        'user_name',
        'booking',
        'property_title',
        'property_location',
        'razorpay_order_id',
        'razorpay_payment_id',
        'razorpay_signature',
        'amount',
        'payment_status',
        'paid_at',
        'created_at'
    ]

        read_only_fields = [
            'id',
            'created_at',
            'user',
            'amount'
        ]

class WishlistSerializer(serializers.ModelSerializer):
    property_title = serializers.CharField(source='property.title',read_only=True)
    property_type = serializers.CharField(source="property.property_type",read_only=True)
    property_location = serializers.CharField(source='property.location',read_only=True)
    property_price = serializers.DecimalField(source='property.price',max_digits=10,decimal_places=2,read_only=True)

    class Meta:

        model = Wishlist

        fields = [
            'id',
            'user',
            'property',
            'property_type',
            'property_title',
            'property_location',
            'property_price',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'created_at',
            'user'
        ]

    def validate(self, data):

        user = self.context['request'].user
        property_obj = data.get('property')

        if user == property_obj.owner:
            raise serializers.ValidationError({
                'user':
                'You cannot add your own property to wishlist.'
            })

        if Wishlist.objects.filter(
            user=user,
            property=property_obj
        ).exists():

            raise serializers.ValidationError({
                'property':
                'Property already exists in wishlist.'
            })

        return data    