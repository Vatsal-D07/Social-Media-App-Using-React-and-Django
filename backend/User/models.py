from django.db import models
from django.contrib.auth.models import User
from PIL import Image
# Create your models here.


class Profile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    image=models.ImageField(default='profile-pics/default.jpg',upload_to='profile-pics')
    bio=models.TextField()
    
    # Many-to-many relationships for followers and following
    followers = models.ManyToManyField('self', symmetrical=False, related_name='user_following', blank=True)
    following = models.ManyToManyField('self', symmetrical=False, related_name='user_followers', blank=True)


    def __str__(self):
        return f"{self.user.username} Profile"
    
    def save(self,*args,**kwargs):
        super().save(*args,**kwargs)
        
        img = Image.open(self.image.path)
        
        if img.height >300 or img.width>300:
            output_size=(300,300)
            img.thumbnail(output_size)
            img.save(self.image.path)
         
         