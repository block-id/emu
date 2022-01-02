from django.contrib.auth import logout
from django.http.response import HttpResponse
from rest_framework import views
from rest_framework.permissions import IsAuthenticated


class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return HttpResponse("Success!")
