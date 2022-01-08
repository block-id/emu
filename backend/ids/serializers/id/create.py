from rest_framework import serializers

from ids.models import Id


class IdCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Id
        fields = "__all__"
        read_only_fields = ["created_at"]
