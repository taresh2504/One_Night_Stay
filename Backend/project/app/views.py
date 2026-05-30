from rest_framework import generics
from .models import *
from .serializers import UserSerializer,PropertySerializer
from rest_framework.permissions import IsAuthenticated


# Register User API
class UserRegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = UserSerializer
    

# Get All Users API
class UserListView(generics.ListAPIView):

    queryset = User.objects.all()

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


# Single User API
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = User.objects.all()

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

# Property begin 

# LIST + CREATE PROPERTY
class PropertyListCreateView(generics.ListCreateAPIView):

    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        serializer.save(owner=self.request.user) 

# RETRIEVE + UPDATE + DELETE PROPERTY
class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]        
