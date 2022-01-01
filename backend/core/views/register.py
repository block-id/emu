from django.contrib.auth import get_user_model
from rest_framework import generics, permissions

from core.serializers.register import RegisterSerializer

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
