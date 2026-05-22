from rest_framework import generics
from .models import User
from .serializers import UserSerializer


# Register User API
class UserRegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = UserSerializer


# Get All Users API
class UserListView(generics.ListAPIView):

    queryset = User.objects.all()

    serializer_class = UserSerializer


# Single User API
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = User.objects.all()

    serializer_class = UserSerializer