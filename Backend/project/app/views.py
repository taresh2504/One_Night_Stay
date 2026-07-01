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
from datetime import date
from django.db.models import Q
import razorpay
from django.conf import settings
from decimal import Decimal
from django.contrib.auth import get_user_model

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
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
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

        user = authenticate(request,email=email,password=password)

        if not user:

            return Response(
                {
                    "message":
                    "Incorrect password."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        refresh = RefreshToken.for_user(user)

        return Response(
    {
        "message": "Login successful.",
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "role": user.role,
        "host_status": user.host_status,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "created_at": user.created_at,
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

    # permission_classes = [AllowAny]      

# class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):

#     queryset = Property.objects.all()
#     serializer_class = PropertySerializer
#     permission_classes = [AllowAny]

#     def get(self, request, *args, **kwargs):
#         print("PROPERTY DETAIL VIEW HIT")
#         return super().get(request, *args, **kwargs)


# class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Property.objects.all()
#     serializer_class = PropertySerializer
#     permission_classes = (AllowAny,)
    

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
        user = self.request.user
        user.host_status = "pending"
        user.save()

        serializer.save(user=user,end_date=timezone.now() + timedelta(days=30))
        
class UserSubscriptionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserSubscription.objects.all()
    serializer_class = UserSubscriptionSerializer  


class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist = Wishlist.objects.filter(user=request.user).select_related('property')
        serializer = WishlistSerializer(wishlist,many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self, request):

        serializer = WishlistSerializer(data=request.data,context={'request': request})

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(serializer.data,status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)    

class WishlistDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, property_id):

        wishlist_item = Wishlist.objects.filter(user=request.user,property_id=property_id).first()

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
        bookings = Booking.objects.filter(user=request.user).select_related('property')
        serializer = BookingSerializer(bookings,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BookingSerializer(data=request.data,context={'request': request})

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response(serializer.data,status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class CancelBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, booking_id):
        booking = Booking.objects.filter(id=booking_id,user=request.user).first()

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

        bookings = Booking.objects.filter(property__owner=request.user).select_related('user','property')
        serializer = BookingSerializer(bookings,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)


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
        booking = Booking.objects.filter(id=booking_id,property__owner=request.user).first()

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


class PaymentListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        payments = Payment.objects.filter(user=request.user)
        serializer = PaymentSerializer(payments,many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request):
        serializer = PaymentSerializer(
            data=request.data
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
    
class PaymentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        payment = Payment.objects.filter(id=pk,user=request.user).first()

        if not payment:
            return Response(
                {
                    "error":
                    "Payment not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = PaymentSerializer(payment)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

class ReviewListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews,many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request):

        serializer = ReviewSerializer(
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
    
class ReviewDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        review = Review.objects.filter(id=pk).first()

        if not review:
            return Response(
                {
                    "error":
                    "Review not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ReviewSerializer(review)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
    

class PropertySearchView(APIView):

    def get(self, request):
        properties = Property.objects.all()
        search = request.query_params.get('search')
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        property_type = request.query_params.get('property_type')
        featured = request.query_params.get('featured')
        ordering = request.query_params.get("ordering")

        if ordering:
            properties = properties.order_by(ordering)

        if search:

            properties = properties.filter(
                Q(title__icontains=search) |
                Q(location__icontains=search) |
                Q(property_type__icontains=search)
            )

        if min_price:

            properties = properties.filter(price__gte=min_price)

        if max_price:

            properties = properties.filter(price__lte=max_price)

        if property_type:

            properties = properties.filter(property_type__iexact=property_type)

        if featured:

            properties = properties.filter(is_featured=featured.lower() == 'true')

        serializer = PropertySerializer(properties, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
    

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {
                    "message":
                    "Logout successful."
                },
                status=status.HTTP_200_OK
            )

        except Exception:

            return Response(
                {
                    "error":
                    "Invalid token."
                },
                status=status.HTTP_400_BAD_REQUEST
            ) 


class MyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

class MyPropertiesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):

        properties = Property.objects.filter(owner=request.user)
        serializer = PropertySerializer(properties,many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

# class MyPropertiesView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):

#         print("USER =", request.user)
#         print("AUTH =", request.auth)

#         properties = Property.objects.filter(
#             owner=request.user
#         )

#         serializer = PropertySerializer(properties, many=True)

#         return Response(serializer.data)



class MyBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = Booking.objects.filter(user=request.user)
        serializer = BookingSerializer(bookings,many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

class MyPaymentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        payments = Payment.objects.filter(user=request.user).order_by("-created_at")
        serializer = PaymentSerializer(payments,many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

class PropertyReviewsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, property_id):

        property_obj = Property.objects.filter(id=property_id).first()

        if not property_obj:

            return Response(
                {
                    "error":
                    "Property not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        reviews = Review.objects.filter(property=property_obj)
        serializer = ReviewSerializer(reviews,many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )    

class ShowHostsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "admin":
            return Response({"message": "Unauthorized"}, status=403)

        hosts = User.objects.filter(role="host")
        serializer = UserSerializer(hosts, many=True)
        return Response(serializer.data)  

class PendingHostsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "admin":
            return Response({"message": "Unauthorized"}, status=403)

        pending_hosts = User.objects.filter(role="host",host_status="pending")
        serializer = UserSerializer(pending_hosts, many=True)
        return Response(serializer.data)   

class ShowAllPropertiesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "admin":
            return Response(
                {"message": "Unauthorized"},
                status=403
            )

        properties = Property.objects.all().order_by("-created_at")
        serializer = PropertySerializer(properties, many=True)
        return Response(serializer.data)

class ShowAllBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "admin":
            return Response(
                {"message": "Unauthorized"},
                status=403
            )

        bookings = Booking.objects.all().order_by("-created_at")
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)

class AllPaymentHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "admin":
            return Response(
                {"message": "Unauthorized"},
                status=403
            )

        payments = Payment.objects.all().order_by("-paid_at")
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)  


class ShowAllReviewsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "admin":
            return Response(
                {"message": "Unauthorized"},
                status=403
            )

        reviews = Review.objects.all().order_by("-created_at")
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data) 

class HostPropertyReviewsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        reviews = Review.objects.filter(property__owner=request.user).order_by("-created_at")
        serializer = ReviewSerializer(reviews,many=True)
        return Response(serializer.data)

class MyReviewsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        reviews = Review.objects.filter(user=request.user).order_by("-created_at")
        serializer = ReviewSerializer(reviews,many=True)
        return Response(serializer.data)         
    

class ApproveSubscriptionView(generics.UpdateAPIView):

    queryset = UserSubscription.objects.all()
    serializer_class = UserSubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):

        if request.user.role != "admin":
            raise PermissionDenied("Only admin can approve subscriptions.")

        subscription = self.get_object()
        subscription.approval_status = "approved"
        subscription.save()
        user = subscription.user
        user.host_status = "approved"
        user.role = "host"
        user.save()

        return Response(
            {
                "message": "Subscription approved successfully."
            },
            status=status.HTTP_200_OK
        )

class RejectSubscriptionView(generics.UpdateAPIView):

    queryset = UserSubscription.objects.all()
    serializer_class = UserSubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):

        if request.user.role != "admin":
            raise PermissionDenied(
                "Only admin can reject subscriptions."
            )

        subscription = self.get_object()
        subscription.approval_status = "rejected"
        subscription.save()
        user = subscription.user
        user.host_status = "rejected"
        user.save()

        return Response(
            {
                "message": "Subscription rejected successfully."
            },
            status=status.HTTP_200_OK
        )

class PendingSubscriptionListView(generics.ListAPIView):

    serializer_class = UserSubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        if self.request.user.role != "admin":
            raise PermissionDenied("Only admin can view subscription requests.")

        return UserSubscription.objects.filter(approval_status="pending")  

class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        property_id = request.data.get("property")
        check_in = request.data.get("check_in")
        check_out = request.data.get("check_out")
        guests_count = request.data.get("guests_count")
        print(request.data)
        print(property_id)
        property_obj = Property.objects.get(id=property_id)
        nights = (
            date.fromisoformat(check_out)
            -
            date.fromisoformat(check_in)
        ).days
        check_in = date.fromisoformat(request.data.get("check_in"))
        check_out = date.fromisoformat(request.data.get("check_out"))
        guests_count = request.data.get("guests_count")
        total_amount = property_obj.price * nights
        booking = Booking.objects.create(
            user=request.user,
            property=property_obj,
            check_in=check_in,
            check_out=check_out,
            guests_count=guests_count,
            booking_status="pending"
        )

        client = razorpay.Client(
            auth=(
                settings.RAZORPAY_KEY_ID,
                settings.RAZORPAY_KEY_SECRET
            )
        )

        razorpay_order = client.order.create({
            "amount": int(total_amount * 100),
            "currency": "INR",
            "payment_capture": 1
        })

        payment = Payment.objects.create(
            user=request.user,
            booking=booking,
            razorpay_order_id=razorpay_order["id"],
            amount=total_amount
        )

        return Response({
            "order_id": razorpay_order["id"],
            "amount": int(total_amount * 100),
            # "amount": int(total_amount * 1),
            "currency": "INR",
            "booking_id": booking.id,
            "payment_id": payment.id,
            "key": settings.RAZORPAY_KEY_ID
        })   
     
class VerifyPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        razorpay_order_id = request.data.get("razorpay_order_id")
        razorpay_payment_id = request.data.get("razorpay_payment_id")
        razorpay_signature = request.data.get("razorpay_signature")

        try:

            client = razorpay.Client(
                auth=(
                    settings.RAZORPAY_KEY_ID,
                    settings.RAZORPAY_KEY_SECRET
                )
            )

            client.utility.verify_payment_signature({
                "razorpay_order_id": razorpay_order_id,
                "razorpay_payment_id": razorpay_payment_id,
                "razorpay_signature": razorpay_signature
            })

            payment = Payment.objects.get(razorpay_order_id=razorpay_order_id)
            payment.razorpay_payment_id = razorpay_payment_id
            payment.razorpay_signature = razorpay_signature
            payment.payment_status = "success"
            payment.paid_at = timezone.now()
            payment.save()

            return Response({
                "message": "Payment verified successfully."
            })

        except Exception as e:

            return Response({

                "error": str(e)

            }, status=400)


class HostPaymentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        payments = Payment.objects.filter(booking__property__owner=request.user).order_by("-created_at")
        serializer = PaymentSerializer(payments,many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
    


class CreateAdminView(APIView):

    def get(self, request):

        try:
            User = get_user_model()

            email = "admin@gmail.com"

            user = User.objects.filter(email=email).first()

            if user:
                user.is_staff = True
                user.is_superuser = True
                user.role = "admin"
                user.host_status = "none"
                user.set_password("Sy@12345")
                user.save()

                return Response({
                    "message": "Existing user updated as admin",
                    "email": email
                })

            user = User(
                email="admin@gmail.com",
                name="Sanjay Yadav",
                phone="9999999999",
                role="admin",
                host_status="none",
                is_staff=True,
                is_superuser=True,
                is_active=True,
            )

            user.set_password("Sy@12345")
            user.save()

            return Response({
                "message": "Admin created successfully",
                "email": "admin@gmail.com",
                "password": "Sy@12345"
            })

        except Exception as e:
            return Response({
                "error": str(e)
            }, status=500)