from rest_framework import serializers
from django.contrib.auth.models import User
from .models import TweetModel, CommentModel
from User.serializers import UserSerializer
# Serializer for the TweetModel
class TweetSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = TweetModel
        fields = ['id', 'user', 'text', 'image', 'created_at', 'likes']

# Serializer for the CommentModel
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # Adjust to reflect the user's username
    tweet = serializers.PrimaryKeyRelatedField(queryset=TweetModel.objects.all())  # Field to link to TweetModel

    class Meta:
        model = CommentModel
        fields = ['id', 'user', 'tweet', 'comment', 'created_at']  # Ensure these fields match your CommentModel
