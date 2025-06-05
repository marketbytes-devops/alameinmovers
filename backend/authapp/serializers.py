from rest_framework import serializers
from .models import CustomUser
from django.utils import timezone
from datetime import timedelta

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

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
        return data

    def validate_email(self, value):
        if not CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return value