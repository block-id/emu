from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed

from core.actions import sign_data


class SignView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        password = request.data.get("password")
        if not authenticate(request, username=request.user.username, password=password):
            raise AuthenticationFailed("Invalid password")

        payload = request.data.get("payload")
        keypair = request.user.keypair
        response = {
            "sign": sign_data(keypair, payload, password),
            "publicKey": keypair.public_key,
        }
        return JsonResponse(response)
