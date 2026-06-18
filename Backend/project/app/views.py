from rest_framework import generics,status
from django.contrib.auth import authenticate
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta


class BecomeHostView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        if user.host_status == 'pending':
            return Response(
                {
                    'message':
                    'Host request already pending.'
                },
                status=400
            )

        if user.host_status == 'approved':
            return Response(
                {
                    'message':
                    'You are already an approved host.'
                },
                status=400
            )

        user.role = 'host'
        user.host_status = 'pending'

        user.save()

        return Response(
            {
                'message':
                'Host request sent to admin.'
            },
            status=200
        )


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated] 


class LoginView(APIView):

    def post(self, request):

        serializer = LoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:

            user = User.objects.get(
                email=email
            )

        except User.DoesNotExist:

            return Response(
                {
                    "message":
                    "Account not found. Please register first."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        user = authenticate(
            request,
            email=email,
            password=password
        )

        if not user:

            return Response(
                {
                    "message":
                    "Incorrect password."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        refresh = RefreshToken.for_user(
            user
        )

        return Response(
            {
                "message":
                "Login successful.",

                "refresh":
                str(refresh),

                "access":
                str(refresh.access_token)
            },
            status=status.HTTP_200_OK
        )    


class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):

        if self.request.method == 'GET':
            return [AllowAny()]

        return [IsAuthenticated()]

    def perform_create(self, serializer):

        user = self.request.user

        if user.role != 'host':
            raise PermissionDenied(
                "Become a host first."
            )

        if user.host_status != 'approved':
            raise PermissionDenied(
                "Admin approval required."
            )

        serializer.save(owner=user) 


class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]       
    

class PropertyImageListCreateView(generics.ListCreateAPIView):

    queryset = PropertyImage.objects.all()
    serializer_class = PropertyImageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        user = self.request.user

        property_obj = serializer.validated_data['property']

        
        if user.role != 'host':
            raise PermissionDenied(
                "Only hosts can upload property images."
            )

        if user.host_status != 'approved':
            raise PermissionDenied(
                "Admin approval required."
            )

        
        if property_obj.owner != user:
            raise PermissionDenied(
                "You can upload images only to your own property."
            )

        serializer.save()     

class SubscriptionPlanListView(generics.ListCreateAPIView):
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer   


class SubscriptionPlanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer              


class UserSubscriptionCreateView(generics.CreateAPIView):

    serializer_class = UserSubscriptionSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        serializer.save(
        user=self.request.user,
        end_date=timezone.now() + timedelta(days=30)
    )
        
class UserSubscriptionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserSubscription.objects.all()
    serializer_class = UserSubscriptionSerializer  


class WishlistView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        wishlist = Wishlist.objects.filter(
            user=request.user
        ).select_related('property')

        serializer = WishlistSerializer(
            wishlist,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request):

        serializer = WishlistSerializer(
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():

            serializer.save(
                user=request.user
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )    

class WishlistDeleteView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, property_id):

        wishlist_item = Wishlist.objects.filter(
            user=request.user,
            property_id=property_id
        ).first()

        if not wishlist_item:
            return Response(
                {
                    "error":
                    "Property not found in wishlist."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        wishlist_item.delete()

        return Response(
            {
                "message":
                "Property removed from wishlist."
            },
            status=status.HTTP_200_OK
        )

class BookingView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        bookings = Booking.objects.filter(
            user=request.user
        ).select_related(
            'property'
        )

        serializer = BookingSerializer(
            bookings,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request):

        serializer = BookingSerializer(
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():

            serializer.save(
                user=request.user
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class CancelBookingView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, booking_id):

        booking = Booking.objects.filter(
            id=booking_id,
            user=request.user
        ).first()

        if not booking:
            return Response(
                {
                    "error":
                    "Booking not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        booking.booking_status = 'cancelled'
        booking.save()

        return Response(
            {
                "message":
                "Booking cancelled successfully."
            },
            status=status.HTTP_200_OK
        )


class HostBookingListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        bookings = Booking.objects.filter(
            property__owner=request.user
        ).select_related(
            'user',
            'property'
        )

        serializer = BookingSerializer(
            bookings,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

class ApproveBookingView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, booking_id):

        booking = Booking.objects.filter(
            id=booking_id,
            property__owner=request.user
        ).first()

        if not booking:

            return Response(
                {
                    "error":
                    "Booking not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        booking.booking_status = 'confirmed'
        booking.save()

        return Response(
            {
                "message":
                "Booking approved successfully."
            },
            status=status.HTTP_200_OK
        )


class RejectBookingView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, booking_id):

        booking = Booking.objects.filter(
            id=booking_id,
            property__owner=request.user
        ).first()

        if not booking:

            return Response(
                {
                    "error":
                    "Booking not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        booking.booking_status = 'cancelled'
        booking.save()

        return Response(
            {
                "message":
                "Booking rejected successfully."
            },
            status=status.HTTP_200_OK
        )                             