from django.db import models
from django.contrib.auth.models import AbstractUser

from keys.models.key_pair import KeyPair

class User(AbstractUser):
    key_pair = models.OneToOneField(KeyPair, on_delete=models.PROTECT, null=True)
