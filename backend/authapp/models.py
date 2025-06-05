from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser
from django.utils import timezone
from datetime import timedelta

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role
        return data

class LoginSerializer(CustomTokenObtainPairSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password'),
        }
        return super().validate(credentials)

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return value

class OTPVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, data):
        email = data.get('email')
        otp = data.get('otp')
        try:
            user = CustomUser.objects.get(email=email)
            if not user.otp or user.otp != otp:
                raise serializers.ValidationError("Invalid or expired OTP")
            if user.otp_created_at < timezone.now() - timedelta(minutes=10):
                raise serializers.ValidationError("OTP has expired")
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist")
        return data

class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(write_only=True)
    confirm_new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_new_password']:
            raise serializers.ValidationError("Passwords do not match")
        if not (8 <= len(data['new_password']) <= 128):
            raise serializers.ValidationError("Password must be between 8 and 128 characters")
        if not any(c.isupper() for c in data['new_password']):
            raise serializers.ValidationError("Password must contain at least one uppercase letter")
        if not any(c.islower() for c in data['new_password']):
            raise serializers.ValidationError("Password must contain at least one lowercase letter")
        if not any(c.isdigit() for c in data['new_password']):
            raise serializers.ValidationError("Password must contain at least one digit")
        if not any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in data['new_password']):
            raise serializers.ValidationError("Password must contain at least one special character")
        return data

    def validate_email(self, value):
        if not CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return value