from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(TweetModel)
admin.site.register(CommentModel)