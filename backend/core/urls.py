from django.urls import path

from core import views

app_name = "core"

urlpatterns = [
    path(
        "api/register/",
        views.register.RegisterView.as_view(),
        name="register",
    ),
    path(
        "api/login/",
        views.login.LoginView.as_view(),
        name="login",
    ),
]
