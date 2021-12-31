from django.contrib import admin
from django.urls import path
from django.urls.conf import include

from core import urls as core_urls

urlpatterns = [
    # App URLs
    path("", include(core_urls, namespace="core")),
    # Other
    path('admin/', admin.site.urls),
]
