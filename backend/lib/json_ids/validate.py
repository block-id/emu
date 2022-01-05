from jsonschema import validate

from .schema import json_id_schema


def validate_json_id(json):
    validate(instance=json, schema=json_id_schema)
