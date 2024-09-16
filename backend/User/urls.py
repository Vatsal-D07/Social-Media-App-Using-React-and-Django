from django.urls import path,include
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("user/register/", CreateUserView().as_view(),name="register"),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('password_reset/',PasswordResetView.as_view(),name='password-reset'),
    path('password_reset_confirm/',PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path("login-with-google/",LoginWithGoogle.as_view(),name='login-with-google')
]
