from django.urls import path
from django.urls.conf import re_path

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
    path(
        "api/logout/",
        views.logout.LogoutView.as_view(),
        name="logout",
    ),
    path(
        "api/user/",
        views.user.CurrentUserView.as_view(),
        name="current-user",
    ),
    path(
        "api/sign/",
        views.sign.SignView.as_view(),
        name="sign",
    ),
    re_path("api/.*", views.errors.http_404, name="default-api"),
    re_path(".*", views.react.react, name="spa"),
]
