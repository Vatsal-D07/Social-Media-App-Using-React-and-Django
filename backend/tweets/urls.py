from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TweetViewSet, CommentViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'tweets', TweetViewSet, basename='tweet')
router.register(r'comments', CommentViewSet, basename='comment')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
