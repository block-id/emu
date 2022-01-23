import typing

from cryptography.hazmat.primitives.asymmetric.ed25519 import (
    Ed25519PrivateKey,
    Ed25519PublicKey,
)
from cryptography.hazmat.primitives.serialization import (
    Encoding,
    BestAvailableEncryption,
    PrivateFormat,
    PublicFormat,
    load_pem_private_key,
)


def _deserialize_bytes(string: str) -> bytes:
    return bytes(bytearray.fromhex(string))


def _serialize_bytes(bites: bytes) -> str:
    return bites.hex()


def _to_bytes(string: str):
    return bytes(string, "utf-8")


def create_keypair(password: str) -> typing.Tuple[str, str]:
    assert password is not None, "Password is required"

    private_key = Ed25519PrivateKey.generate()
    private_serialized = _serialize_bytes(
        private_key.private_bytes(
            Encoding.PEM,
            PrivateFormat.PKCS8,
            BestAvailableEncryption(_to_bytes(password)),
        )
    )
    public_serialized = _serialize_bytes(
        private_key.public_key().public_bytes(
            Encoding.Raw,
            PublicFormat.Raw,
        )
    )
    return (public_serialized, private_serialized)


class KeyStore:
    def __init__(
        self, key_pair: typing.Tuple[str, str], password: typing.Optional[str]
    ):
        self._public_key = Ed25519PublicKey.from_public_bytes(
            _deserialize_bytes(key_pair[0])
        )
        self._private_key = load_pem_private_key(
            _deserialize_bytes(key_pair[1]),
            _to_bytes(password) if password is not None else None,
        )

    def sign(data):
        pass

    def verify(data):
        pass
