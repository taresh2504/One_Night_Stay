"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path,include
from app.views import *
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('become-host/',BecomeHostView.as_view(),name='become-host'),
    path('register/',UserRegisterView.as_view(),name='register'),
    path('users/',UserListView.as_view(),name='users'),
    path('users/<int:pk>/',UserDetailView.as_view(),name='user-detail'),
    path('login/',LoginView.as_view(),name='login'),
    path('subscription-plans/',SubscriptionPlanListView.as_view(),name='subscription-plans'),
    path('subscription-plans/<int:pk>/',SubscriptionPlanDetailView.as_view(),name='subscription-plan-detail'),
    path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('properties/',PropertyListCreateView.as_view(),name='property-list-create'),
    path('properties/<int:pk>/', PropertyDetailView.as_view(),name='property-detail'),
    path('property-images/',PropertyImageListCreateView.as_view(),name='property-image-list-create'),
    path('subscribe/',UserSubscriptionCreateView.as_view(),name='subscribe'),
    path('subscriptions/<int:pk>/',UserSubscriptionDetailView.as_view(),name='subscription-detail'),
    path('wishlist/',WishlistView.as_view(),name='wishlist'),
    path('wishlist/<int:property_id>/',WishlistDeleteView.as_view(),name='wishlist-delete'),
    path('booking/',BookingView.as_view(),name='booking'),
    path('booking/<int:booking_id>/cancel/',CancelBookingView.as_view(),name='cancel-booking'),
    path('host/bookings/',HostBookingListView.as_view(),name='host-bookings'),
    path('host/bookings/<int:booking_id>/approve/',ApproveBookingView.as_view(),name='approve-booking'),
    path('host/bookings/<int:booking_id>/reject/',RejectBookingView.as_view(),name='reject-booking'),
    path('payment/',PaymentListCreateView.as_view(),name='payment-list-create'),
    path('payment/<int:pk>/',PaymentDetailView.as_view(),name='payment-detail'),
    path('review/',ReviewListCreateView.as_view(),name='review-list-create'),
    path('review/<int:pk>/',ReviewDetailView.as_view(),name='review-detail'),
    path('properties/search/',PropertySearchView.as_view(),name='property-search'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('profile/', MyProfileView.as_view(), name='profile'),
    path('my-properties/', MyPropertiesView.as_view(), name='my-properties'),
    path('my-bookings/', MyBookingsView.as_view(), name='my-bookings'),
    path('my-payments/', MyPaymentsView.as_view(), name='my-payments'),
    path('properties/<int:property_id>/reviews/', PropertyReviewsView.as_view(), name='property-reviews'),
    path("hosts/", ShowHostsView.as_view()),
    path("pending-hosts/", PendingHostsView.as_view()),
    path("all-properties/", ShowAllPropertiesView.as_view()),
    path("all-bookings/", ShowAllBookingsView.as_view()),
    path("all-payments/", AllPaymentHistoryView.as_view()),
    path("all-reviews/", ShowAllReviewsView.as_view()),
    path("approve-subscription/<int:pk>/",ApproveSubscriptionView.as_view(),name="approve-subscription"),
    path("reject-subscription/<int:pk>/",RejectSubscriptionView.as_view(),
    name="reject-subscription"),
    path("pending-subscriptions/",PendingSubscriptionListView.as_view(),
    name="pending-subscriptions"),
    path("payment/create-order/",CreateOrderView.as_view(),name="create-order"),
    path("payment/verify/",VerifyPaymentView.as_view(),name="verify-payment"),
    path("host/property-reviews/",HostPropertyReviewsView.as_view(),name="host-property-reviews"),
    path("my-reviews/",MyReviewsView.as_view(),name="my-reviews"),
    path("host-payments/",HostPaymentsView.as_view(),name="host-payments"),
    # API Documentation 
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]


