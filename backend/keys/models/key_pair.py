from django.db import models
from django.contrib.auth import get_user_model


class KeyPair(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    private_key = models.TextField()
    public_key = models.TextField()
