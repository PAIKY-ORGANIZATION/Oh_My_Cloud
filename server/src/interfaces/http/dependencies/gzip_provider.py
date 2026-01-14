from interfaces.file_handling.gzip_service import GzipService


gzip_provider_singleton = GzipService()

def get_gzip_provider():
    return gzip_provider_singleton
