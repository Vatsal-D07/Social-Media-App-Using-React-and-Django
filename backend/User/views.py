from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics,permissions
from .serializers import UserSerializer,PasswordResetSerializer,SetNewPasswordSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response


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
