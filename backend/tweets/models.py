from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class TweetModel(models.Model):
    # ME --> mytweet
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    image = models.ImageField(upload_to='posts/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_tweets', blank=True)
    
    def __str__(self):
        return f'{self.user.username} : {self.created_at}'
    


class CommentModel(models.Model):
    tweet = models.ForeignKey(TweetModel, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()