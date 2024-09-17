from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TweetViewSet, CommentViewSet,LikeTweetView

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'tweets', TweetViewSet, basename='tweet')
router.register(r'comments', CommentViewSet, basename='comment')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('tweet/<int:tweet_id>/like/', LikeTweetView.as_view(), name='like-tweet'),  # Added like functionality
]
