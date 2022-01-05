import json

from django.shortcuts import HttpResponse
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from jsonschema.exceptions import ValidationError as JsonValidationError

from ids.models import Id
from lib.json_ids.validate import validate_json_id


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
        if request.content_type != "application/json":
            json_data = request.data.get("json")
            json_id = json.loads(json_data)
        else:
            json_id = request.data.get("json")

        try:
            validate_json_id(json_id)
        except JsonValidationError as e:
            error_path = "json." + ".".join(map(str, e.path))
            raise ValidationError(f"{error_path}: {e.message}")
        return HttpResponse("hi")
