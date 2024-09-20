from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics,permissions
from .serializers import UserSerializer,PasswordResetSerializer,SetNewPasswordSerializer,ProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .utils import *
from rest_framework_simplejwt.tokens import AccessToken,RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from .models import *
from rest_framework import viewsets,status
from rest_framework.decorators import action



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
    



class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        
        if self.request.query_params.get('all') == 'true':
            # Return all profiles if 'all=true' query param is provided
            
            return Profile.objects.all()

        # Only allow users to see their own profile
        return Profile.objects.filter(user=self.request.user)

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_queryset().first()  # Get the user's profile
    #     print(instance)
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)
    
    @action(detail=False, methods=['put'], url_path='update-profile/(?P<user_id>\d+)')
    def update_profile(self, request, user_id=None):
        try:
            # Fetch the user by ID
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user is the same as the logged-in user or has permission to update
        if request.user != user:
            return Response({'error': 'You do not have permission to update this user.'}, status=status.HTTP_403_FORBIDDEN)

        # Update username if provided
        username = request.data.get('username')
        if username:
            user.username = username
            user.save()

        # Get the profile associated with the user
        profile = Profile.objects.get(user=user)
        print
        # Update the profile image and bio
        image = request.data.get('image')
        print(image)
        bio = request.data.get('bio')

        if image:
            profile.image = image
        if bio:
            profile.bio = bio

        profile.save()

        return Response({'message': 'Profile updated successfully.'}, status=status.HTTP_200_OK)

        
    @action(detail=False, methods=['get'], url_path='user/(?P<user_id>\d+)')
    def get_profile_by_user(self, request, user_id=None):
        user_profile = Profile.objects.filter(user_id=user_id).first()
        serializer = self.get_serializer(user_profile)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='follow')
    def follow_user(self, request, pk=None):
        profile_to_follow = self.get_object()
        current_user_profile = request.user.profile

        if current_user_profile == profile_to_follow:
            return Response({'error': 'You cannot follow yourself.'}, status=status.HTTP_400_BAD_REQUEST)

        if current_user_profile.following.filter(id=profile_to_follow.id).exists():
            return Response({'error': 'You are already following this user.'}, status=status.HTTP_400_BAD_REQUEST)

        current_user_profile.following.add(profile_to_follow)
        profile_to_follow.followers.add(current_user_profile)
        return Response({'status': 'Following'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='unfollow')
    def unfollow_user(self, request, pk=None):
        profile_to_unfollow = self.get_object()
        current_user_profile = request.user.profile

        if not current_user_profile.following.filter(id=profile_to_unfollow.id).exists():
            return Response({'error': 'You are not following this user.'}, status=status.HTTP_400_BAD_REQUEST)

        current_user_profile.following.remove(profile_to_unfollow)
        profile_to_unfollow.followers.remove(current_user_profile)
        return Response({'status': 'Unfollowed'}, status=status.HTTP_200_OK)

