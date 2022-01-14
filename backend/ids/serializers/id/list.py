from rest_framework import serializers

from ids.models import Id


class IdListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Id
        fields = [
            "id",
            "url",
            "type",
            "verifiable_id",
            "verified_at",
            "created_at",
        ]
        extra_kwargs  = {
            "url": {
                "view_name": "ids:api:id-detail"
            }
        }
