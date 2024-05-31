from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework.response import Response
from base.serializers import *

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    






@api_view(['POST'])
def register(request):
    data = request.data
    email = data.get('email', '')
    username = data.get('username', '')
    number = data.get('number', '')
    password = data.get('password', '')

    if not email or not username or not number or not password:
        return Response({"message": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create(
            username=username,
            email=email,
            number=number,
            password=make_password(password)
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        message = {'message': 'User with this email already exists' if 'UNIQUE constraint' in str(e) else str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_image_link(request):
    data = request.data
    user = request.user

    serializer = ImageLinkSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_image_link(request, pk):
    data = request.data
    user = request.user

    image_link = get_object_or_404(ImageLink, pk=pk, user=user)

    serializer = ImageLinkSerializer(image_link, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_image_link_by_id(request, pk):
    image_link = get_object_or_404(ImageLink, id=pk)
    image_link.check_and_expire()
    #if image_link.is_expired:
    #    return Response({"detail": "Image link has expired."}, status=status.HTTP_410_GONE) 
    
    serializer = ImageLinkSerializer(image_link)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_image_links(request):
    user = request.user
    image_links = ImageLink.objects.filter(user=user).order_by('-created_at')

    for i in image_links:
        i.check_and_expire()
    
    serializer = ImageLinkSerializer(image_links, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
#@permission_classes([IsAuthenticated])
def delete_imagelink(request, pk):
    image=get_object_or_404(ImageLink, pk=pk)
    image.delete()
    return Response("delete successful")