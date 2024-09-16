from rest_framework import serializers
from django.contrib.auth.models import User
from .models import TweetModel, CommentModel

# Serializer for the TweetModel
class TweetSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = TweetModel
        fields = ['id', 'user', 'text', 'image', 'created_at', 'likes']

# Serializer for the CommentModel
class CommentSerializer(serializers.ModelSerializer):
    users = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = CommentModel
        fields = ['id', 'users', 'comment']
