from rest_framework import serializers

from ids.models import Id


class IdCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Id
        fields = "__all__"
