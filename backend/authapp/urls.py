from django.urls import path
from .views import LoginView, LogoutView, ForgotPasswordView, OTPVerificationView, ResetPasswordView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('otp-verification/', OTPVerificationView.as_view(), name='otp-verification'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
]