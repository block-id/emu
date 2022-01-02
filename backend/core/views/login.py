from django.contrib.auth import authenticate, login
from django.shortcuts import HttpResponse
from rest_framework import views
from rest_framework.exceptions import AuthenticationFailed


class LoginView(views.APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(
            request,
            username=username,
            password=password,
        )
        if user is not None:
            login(request, user)
            # TODO: Redirect somewhere
            return HttpResponse("Success!")
        else:
            raise AuthenticationFailed("Incorrect username/password!")
