import typing
import json
import uuid
from copy import deepcopy

from lib.crypto.keystore import KeyStore
from ids.models import Id


def create_verifiable_presentation(
    id: Id,
    attribute_groups: typing.Set[str],
    password: str,
    entropy: str,
) -> dict:
    # Initialize the keystore
    keypair = id.owner.keypair
    keystore = KeyStore(
        (keypair.public_key, keypair.private_key),
        password,
    )

    # Get the required attr groups
    result = {
        "id": {}
    }
    for attr in ["idType", "idName", "issuer"]:
        val = id.verifiable_id["data"].get(attr, "")
        result["id"][attr] = deepcopy(val)

    result["id"]["groups"] = []
    for group in id.verifiable_id["data"]["groups"]:
        group_name = group["data"]["groupName"]
        if group_name in attribute_groups:
            result["id"]["groups"].append(deepcopy(group))

    result["entropy"] = uuid.uuid4().hex + "-" + entropy

    # Minify json and sign
    data = json.dumps(result, separators=(",", ":"))
    sign = keystore.sign(data)
    return {
        "data": result,
        "signature": sign,
    }
