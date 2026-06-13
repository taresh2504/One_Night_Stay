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
]

# if settings.DEBUG:
#     urlpatterns += static(
#         settings.MEDIA_URL,
#         document_root=settings.MEDIA_ROOT
#     )
