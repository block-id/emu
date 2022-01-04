from django.urls import path
from django.urls.conf import include
from rest_framework import routers, urlpatterns

from ids import views

app_name = "ids"
router = routers.DefaultRouter()
router.register(
    r"ids",
    views.ids.IdViewset,
    basename="id",
)

urlpatterns = [
    path(
        "api/",
        include(
            (router.urls, "api-ids"),
            namespace="api",
        ),
    )
]
