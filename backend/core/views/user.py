from django.http.response import JsonResponse
from rest_framework import views
from rest_framework.permissions import IsAuthenticated

from core.serializers.user import UserSerializer


class CurrentUserView(views.APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request):
        return JsonResponse(UserSerializer(request.user).data)
