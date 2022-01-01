from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
    )

    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "password2",
        )

    def validate(self, attrs):
        super().validate(attrs)
        if attrs["password"] != attrs["password2"]:
            raise ValidationError({"password": "Passwords do not match!"})
        return attrs

    def create(self, validated_data):
        User = get_user_model()
        user = User.objects.create(username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user
