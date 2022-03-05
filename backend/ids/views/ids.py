import json
from multiprocessing import AuthenticationError
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.db.models import Q
from django.contrib.auth import authenticate

from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action
from jsonschema.exceptions import ValidationError as JsonValidationError

from ids.models import Id
from ids.serializers.id.create import IdCreateSerializer
from ids.serializers.id.list import IdListSerializer
from ids.actions import create_verifiable_presentation
from ids.utils import verify_json_id
from lib.json_ids.validate import validate_json_id
from lib.drf.pagination import DefaultPageNumberPagination


class IdViewset(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = [IsAuthenticated]
    pagination_class = DefaultPageNumberPagination

    def get_queryset(self):
        qs = Id.objects.filter(owner=self.request.user)

        if self.action == "list":
            query = self.request.GET.get("query")
            if query:
                qs = qs.filter(
                    Q(id_name__icontains=query) | Q(issuer_name__icontains=query)
                )
            type = self.request.GET.get("type")
            if type:
                qs = qs.filter(Q(type=type))
            qs = qs.order_by("-id")

        return qs

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

        # ID signature verification    
        try:
            verify_json_id(json_id)
        except AssertionError as e:
            raise ValidationError(str(e))    

        # Create ID
        serializer = self.get_serializer(
            data={
                "owner": request.user.id,
                "type": json_id["data"]["idType"],
                "issuer_name": json_id["data"]["issuer"]["name"],
                "id_name": json_id["data"]["idName"],
                "verifiable_id": json_id,
            }
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return JsonResponse(serializer.data)

    @action(
        methods=["post"],
        detail=True,
        url_path="create-vp",
        permission_classes=[IsAuthenticated],
    )
    def create_vp(self, request, pk):
        id = self.get_object()
        attribute_groups = set(request.data.get("attribute_groups", []))
        password = request.data.get("password")
        entropy = request.data.get("entropy", "")

        if not authenticate(request, username=request.user.username, password=password):
            raise AuthenticationError("Invalid password")

        presentation = create_verifiable_presentation(
            id,
            attribute_groups,
            password,
            entropy,
        )
        return JsonResponse(presentation)
