from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import TweetSerializer, CommentSerializer
from .models import TweetModel, CommentModel
from rest_framework.views import APIView
from rest_framework import status

class LikeTweetView(APIView):
    def post(self, request, tweet_id):
        user = request.user
        # print(tweet_id)
        try:
            tweet = TweetModel.objects.get(pk=tweet_id)
        except TweetModel.DoesNotExist:
            return Response({'error': 'Tweet not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Toggle like status
        if user in tweet.likes.all():
            # User has already liked the tweet, so unlike it
            tweet.likes.remove(user)
            liked = False
        else:
            # User has not liked the tweet, so like it
            tweet.likes.add(user)
            liked = True
        
        tweet.save()
        
        # Return updated like count and status
        serializer = TweetSerializer(tweet)
        return Response({
            'like_count': tweet.likes.count(),
            'liked': liked
        }, status=status.HTTP_200_OK)
        
        
class TweetViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = TweetModel.objects.all()
    serializer_class = TweetSerializer
    
    def perform_create(self, serializer):
        # Automatically set the user to the currently logged-in user
        serializer.save(user=self.request.user)
    # def list(self, request):
    #     queryset=self.queryset.all()
    #     serializer=self.serializer_class(queryset,many=True)
    #     return Response(serializer.data)

    # def create(self, request):
    #     serializer=self.serializer_class(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data,status=201)
    #     else:
    #         return Response(serializer.errors,status=404)
    
    # def retrieve(self, request, pk=None):
    #     tweet=self.queryset.get(pk=pk)
    #     serializer=self.serializer_class(tweet)
    #     return Response(serializer.data)

    # def destroy(self, request, pk=None):
    #     tweet=self.queryset.get(pk=pk)
    #     tweet.delete()
    #     return Response(status=204)
    # `ModelViewSet` automatically provides `list`, `create`, `retrieve`, `update`, and `destroy` methods.
    # You can override these methods if you need custom behavior.

class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = CommentModel.objects.all()
    serializer_class = CommentSerializer

    # def list(self, request):
    #     queryset=self.queryset.all()
    #     serializer=self.serializer_class(queryset,many=True)
    #     return Response(serializer.data)
    
    # def destroy(self, request, pk=None):
    #     comment=self.queryset.get(pk=pk)
    #     comment.delete()
    #     return Response(status=204)
    
    # def create(self, request):
    #     serializer=self.serializer_class(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data,status=201)
    #     else:
    #         return Response(serializer.errors,status=404)
    
    # `ModelViewSet` automatically provides `list`, `create`, `retrieve`, `update`, and `destroy` methods.
    # You can override these methods if you need custom behavior.
