
from interfaces.hashing.bcrypt_hasher_service import BcryptHasherService


async_hasher_bcrypt_singleton = BcryptHasherService()

def get_hasher_provider():
    return async_hasher_bcrypt_singleton
