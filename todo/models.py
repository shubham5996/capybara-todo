from django.db import models
from django.contrib.auth.models import User, AbstractUser
from traitlets import default

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    notes = models.CharField(max_length=1000, default='')


    
class Tasks(models.Model):
    user = models.ForeignKey(
        User, related_name="tasks", on_delete=models.CASCADE)
    task = models.CharField(max_length=100)
