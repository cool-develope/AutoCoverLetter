from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class CoverLetter(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    letter = models.TextField()
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

class KeyValue(models.Model):
    letter = models.ForeignKey(CoverLetter, on_delete=models.CASCADE)
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)