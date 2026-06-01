from rest_framework import generics
from .models import *
from .serializers import UserSerializer,PropertySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

class BecomeHostView(APIView):

    permission_classes=[IsAuthenticated]

    def post(self,request):

        user=request.user

        if user.role=='host':
            return Response(
                {
                    'message':
                    'Host request already submitted.'
                },
                status=400
            )

        user.role='host'
        user.host_status='pending'

        user.save()

        return Response(
            {
                'message':
                'Host request sent to admin.'
            },
            status=200
        )


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

# RETRIEVE + UPDATE + DELETE PROPERTY
class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]        
