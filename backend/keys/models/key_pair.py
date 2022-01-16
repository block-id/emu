from django.db import models


class KeyPair(models.Model):
    private_key = models.TextField()
    public_key = models.TextField()
