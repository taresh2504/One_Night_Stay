from rest_framework import generics
from .models import *
from .serializers import UserSerializer,PropertySerializer,PropertyImageSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

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
