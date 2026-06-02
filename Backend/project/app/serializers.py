from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User,Property,PropertyImage,Booking,Review
import re
from datetime import date


class UserSerializer(serializers.ModelSerializer):

    cpassword = serializers.CharField(
        write_only=True
    )

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

        if len(value) < 4:
            raise serializers.ValidationError(
                "Minimum 4 characters required."
            )

        if not re.match(r'^[A-Za-z ]+$', value):
            raise serializers.ValidationError(
                "Only alphabets allowed."
            )

        return value

    def validate_email(self, value):

        if not value.lower().endswith("@gmail.com"):
            raise serializers.ValidationError(
                "Only Gmail allowed."
            )

        return value

    def validate_phone(self, value):

        if not re.match(r'^[6-9]\d{9}$', value):
            raise serializers.ValidationError(
                "Invalid mobile number."
            )

        return value

    def validate_password(self, value):

        if not value:
            raise serializers.ValidationError(
                "Password cannot be empty."
            )

        if len(value) < 8 or len(value) > 15:
            raise serializers.ValidationError(
                "Password must be between 8 and 15 characters."
            )

        # At least one lowercase letter
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError(
                "Password must contain at least one lowercase letter."
            )

        # At least one uppercase letter
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError(
                "Password must contain at least one uppercase letter."
            )

        # At least one number
        if not re.search(r'[0-9]', value):
            raise serializers.ValidationError(
                "Password must contain at least one numeric value."
            )

        # At least one special character
        if not re.search(r'[*/+\-!@#$%&^]', value):
            raise serializers.ValidationError(
                "Password must contain at least one special character."
            )

        return value

    def validate(self, data):

        if data.get('password') != data.get('cpassword'):
            raise serializers.ValidationError({
                'cpassword':
                'Passwords do not match.'
            })

        return data

    def create(self, validated_data):

        validated_data.pop('cpassword')

        password = validated_data.pop('password')

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        return user
    
# Property Validations begin  
class PropertySerializer(serializers.ModelSerializer):

    class Meta:
        model = Property

        fields = [
            'id',
            'owner',
            'title',
            'location',
            'price',
            'bedrooms',
            'bathrooms',
            'description',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'created_at',
            'owner'
        ]

    # TITLE VALIDATION
    def validate_title(self, value):

        if len(value.strip()) < 5:
            raise serializers.ValidationError(
                "Title must be at least 5 characters."
            )

        return value

    # LOCATION VALIDATION
    def validate_location(self, value):

        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                "Location is too short."
            )

        return value
    
    # Description validation 
    def validate_description(self, value):

        if len(value.strip()) < 20:
            raise serializers.ValidationError(
                "Description must be at least 20 characters."
            )

        return value

    # PRICE VALIDATION
    def validate_price(self, value):

        if value <= 0:
            raise serializers.ValidationError(
                "Price must be greater than 0."
            )

        return value

    # OBJECT LEVEL VALIDATION
    def validate(self, data):

        if data.get('bedrooms', 0) <= 0:
            raise serializers.ValidationError({
                'bedrooms':
                'Bedrooms must be at least 1.'
            })

        if data.get('bathrooms', 0) < 0:
            raise serializers.ValidationError({
                'bathrooms':
                'Bathrooms cannot be negative.'
            })

        return data
    

class PropertyImageSerializer(serializers.ModelSerializer):

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

    # IMAGE VALIDATION
    def validate_image(self, value):

        # Allowed formats
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
            raise serializers.ValidationError(
                "Only JPG, JPEG, PNG, WEBP files allowed."
            )

        # Max size = 2 MB
        max_size = 2 * 1024 * 1024

        if value.size > max_size:
            raise serializers.ValidationError(
                "Image size must not exceed 2 MB."
            )

        return value    
    

class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking

        fields = [
            'id',
            'user',
            'property',
            'check_in',
            'check_out',
            'total_price',
            'booking_status',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'created_at'
        ]

    # CHECK-IN VALIDATION
    def validate_check_in(self, value):

        if value < date.today():
            raise serializers.ValidationError(
                "Check-in date cannot be in the past."
            )

        return value

    # TOTAL PRICE VALIDATION
    def validate_total_price(self, value):

        if value <= 0:
            raise serializers.ValidationError(
                "Total price must be greater than 0."
            )

        return value

    # OBJECT LEVEL VALIDATION
    def validate(self, data):

        errors = {}

        user = data.get('user')
        check_in = data.get('check_in')
        check_out = data.get('check_out')

        # Host booking restriction
        if user and user.role == 'host':
            errors['user'] = (
                "Hosts cannot create bookings."
            )

        # Date validation
        if (
            check_in
            and
            check_out
            and
            check_out <= check_in
        ):
            errors['check_out'] = (
                "Check-out must be after check-in."
            )

        if errors:
            raise serializers.ValidationError(
                errors
            )

        return data    
    


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review

        fields = [
            'id',
            'user',
            'property',
            'rating',
            'comment',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'created_at'
        ]

    # RATING VALIDATION
    def validate_rating(self, value):

        if not (1 <= value <= 5):
            raise serializers.ValidationError(
                "Rating must be between 1 and 5."
            )

        return value

    # COMMENT VALIDATION
    def validate_comment(self, value):

        if len(value.strip()) < 5:
            raise serializers.ValidationError(
                "Feedback must contain at least 5 characters."
            )

        return value

    # OBJECT LEVEL VALIDATION
    def validate(self, data):

        errors = {}

        user = data.get('user')
        property_obj = data.get('property')

        # Own property review restriction
        if (
            user
            and
            property_obj
            and
            user == property_obj.owner
        ):
            errors['user'] = (
                "You cannot review your own property."
            )
            
        if errors:
            raise serializers.ValidationError(
                errors
            )

        return data    