import typing

from django.conf import settings
from lib.smart_contracts.issuer_contract import IssuerContract
from lib.smart_contracts.web3_helpers import get_web3_http_provider


def verify_json_id(json_id: typing.Any):
    issuer_contract = IssuerContract(
        get_web3_http_provider(settings.WEB3_HTTP_PROVIDER),
        settings.ISSUER_CONTRACT_ABI,
        settings.ISSUER_CONTRACT_ADDRESS,
    )
    # Verify the entire ID's signature
    assert issuer_contract.verify_json_signature(
        json_id["data"],
        json_id["signature"],
        json_id["data"]["idType"],
    ), "Invalid ID signature"
    # Verify every attribute group's signature
    for group in json_id["data"]["groups"]:
        assert issuer_contract.verify_json_signature(
            group["data"],
            group["signature"],
            json_id["data"]["idType"],
        ), f"Invalid attribute group signature for {group['data']['groupName']}"
