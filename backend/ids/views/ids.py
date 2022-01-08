import json
from django.http.response import JsonResponse

from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from jsonschema.exceptions import ValidationError as JsonValidationError

from ids.models import Id
from ids.serializers.id.create import IdCreateSerializer
from ids.serializers.id.list import IdListSerializer
from lib.json_ids.validate import validate_json_id
from lib.drf.pagination import DefaultPageNumberPagination


class IdViewset(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = [IsAuthenticated]
    pagination_class = DefaultPageNumberPagination

    def get_queryset(self):
        return Id.objects.filter(owner=self.request.user)

    def get_serializer_class(self):
        if self.action == "list":
            return IdListSerializer
        else:
            return IdCreateSerializer

    def create(self, request, *args, **kwargs):
        if request.content_type != "application/json":
            json_data = request.data.get("json")
            json_id = json.loads(json_data)
        else:
            json_id = request.data.get("json")

        # Validation
        try:
            validate_json_id(json_id)
        except JsonValidationError as e:
            error_path = "json." + ".".join(map(str, e.path))
            raise ValidationError(f"{error_path}: {e.message}")
        except (AssertionError, ValueError) as e:
            raise ValidationError(str(e))

        # TODO: Add smart contract validation

        # Create ID
        serializer = self.get_serializer(
            data={
                "owner": request.user.id,
                "type": json_id["idType"],
                "verifiable_id": json_id,
            }
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return JsonResponse(serializer.data)
