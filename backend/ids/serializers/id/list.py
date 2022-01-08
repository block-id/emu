from rest_framework import serializers

from ids.models import Id


class IdListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Id
        fields = [
            "id",
            "type",
            "verifiable_id",
            "verified_at",
            "created_at",
        ]
