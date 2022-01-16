import typing

from cryptography.hazmat.primitives.asymmetric.ed25519 import (
    Ed25519PrivateKey,
)
from cryptography.hazmat.primitives.serialization import (
    Encoding,
    BestAvailableEncryption,
    PrivateFormat,
    PublicFormat,
    NoEncryption,
    load_pem_public_key,
    load_pem_private_key,
)


class KeyStore:
    def __init__(
        self, key_pair: typing.Tuple[str, str], password: typing.Optional[str]
    ):
        self._public_key = load_pem_public_key(bytes(key_pair[0]))
        self._private_key = load_pem_private_key(
            bytes(key_pair[1]),
            bytes(password) if password is not None else None,
        )

    @classmethod
    def create_keypair(self, password: str) -> typing.Tuple[str, str]:
        assert password is not None, "Password is required"

        private_key = Ed25519PrivateKey.generate()
        private_serialized = private_key.private_bytes(
            Encoding.PEM,
            PrivateFormat.PKCS8,
            BestAvailableEncryption(bytes(password)),
        )
        public_serialized = private_key.public_key().public_bytes(
            Encoding.PEM,
            PublicFormat.PKCS1,
            NoEncryption(),
        )
        return (public_serialized, private_serialized)

    def sign(data):
        pass

    def verify(data):
        pass
