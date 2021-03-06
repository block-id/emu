from django.db import models
from django.contrib.auth import get_user_model


class Id(models.Model):
    owner = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="owner",
    )
    type = models.CharField(max_length=34)
    issuer_name = models.CharField(max_length=100, db_index=True)
    id_name = models.CharField(max_length=100, db_index=True)
    verifiable_id = models.JSONField()
    verified_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
