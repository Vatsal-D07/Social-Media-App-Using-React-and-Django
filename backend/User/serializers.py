from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.tokens import PasswordResetTokenGenerator
# from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


# PASSWORD RESET serializers

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")
        return value

    def save(self, **kwargs):
        request = self.context.get('request')
        user = User.objects.get(email=self.validated_data['email'])
        token_generator = PasswordResetTokenGenerator()
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)
        reset_link = f"http://localhost:3000/reset-password-confirm/{uid}/{token}/"
        
        # Send email with the reset link
        user.email_user(
            subject="Password Reset Request",
            message=f"Use the link below to reset your password:\n{reset_link}"
        )

# serializers.py

class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)
    uidb64 = serializers.CharField(write_only=True)

    def validate(self, attrs):
        try:
            uid = force_str(urlsafe_base64_decode(attrs['uidb64']))
            user = User.objects.get(pk=uid)
            token = attrs['token']

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError('Invalid token')

            return attrs  # Ensure that the attrs are returned here to be used in save method

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError('Invalid token')

    def save(self):
        password = self.validated_data['password']
        token = self.validated_data['token']
        uid = self.validated_data['uidb64']

        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)
            token_generator = PasswordResetTokenGenerator()
            if not token_generator.check_token(user, token):
                raise serializers.ValidationError('Invalid token')

            user.set_password(password)
            user.save()
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError('Invalid token')