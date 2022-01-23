from django.db import transaction
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions

from lib.crypto.keystore import create_keypair
from core.serializers.register import RegisterSerializer
from keys.models.key_pair import KeyPair

User = get_user_model()


class RegisterPermission(permissions.BasePermission):
    message = "You're already logged in!"

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return True
        return False


class RegisterView(generics.CreateAPIView):
    permission_classes = [RegisterPermission]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        with transaction.atomic():
            serializer.save()
            password = serializer.validated_data.get("password")
            (public_key, private_key) = create_keypair(password)
            KeyPair.objects.create(
                user=serializer.instance,
                public_key=public_key,
                private_key=private_key,
            )
