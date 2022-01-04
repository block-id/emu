import json

from django.shortcuts import HttpResponse
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from ids.models import Id


class IdViewset(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Id.objects.filter(owner=self.request.user)

    def get_serializer_class(self):
        if self.action == "list":
            pass
        elif self.action == "detail":
            pass
        else:
            pass

    def create(self, request, *args, **kwargs):
        json_data = request.data.get("json")
        json_id = json.loads(json_data)
        print(json_id)
        return HttpResponse("hi")
