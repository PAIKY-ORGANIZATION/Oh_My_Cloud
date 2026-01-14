from interfaces.file_handling.cryptography_service import CryptographyService


cryptography_provider_singleton = CryptographyService()

def get_cryptography_provider():
    return cryptography_provider_singleton