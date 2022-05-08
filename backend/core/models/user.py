from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    @property
    def public_key(self):
        return self.keypair.public_key
