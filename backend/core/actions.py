from lib.crypto.keystore import KeyStore
from keys.models.key_pair import KeyPair


def sign_data(keypair: KeyPair, data: str, password: str) -> str:
    keystore = KeyStore(
        (keypair.public_key, keypair.private_key),
        password,
    )
    data = "Emu Signed Message:\n" + data
    return keystore.sign(data)
