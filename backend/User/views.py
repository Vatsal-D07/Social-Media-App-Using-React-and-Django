from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics,permissions
from .serializers import UserSerializer,PasswordResetSerializer,SetNewPasswordSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .utils import *
from rest_framework_simplejwt.tokens import AccessToken,RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    
    

# PASSWORD RESET
class PasswordResetView(generics.GenericAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = [permissions.AllowAny]  # Allow any user to access this view
    authentication_classes = []  # No authentication required
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Password reset link has been sent to your email."})


class PasswordResetConfirmView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes = [permissions.AllowAny]  # Allow any user to access this view
    authentication_classes = []  # No authentication required
    
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Password has been reset successfully."})


# Google Login View
def authenticate_or_create_user(name,email):
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        user=User.objects.create_user(username=name,email=email)
        
    return user

class LoginWithGoogle(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        if 'code' in request.data.keys():
            code=request.data['code']
            id_token = get_id_token_with_code(code)
            user_email=id_token['email']
            user_name=id_token['name']
            user=authenticate_or_create_user(user_name,user_email)
            user_id=user.pk
            token = RefreshToken.for_user(user)
            return Response({'access_token':str(token.access_token),'refresh_token':str(token),'username':user_name,'user_id':user_id})
        
            
            
        return Response('OK')