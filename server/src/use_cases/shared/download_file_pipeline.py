from interfaces.file_handling.cryptography_service import CryptographyService
from interfaces.file_handling.gzip_service import GzipService
from interfaces.object_storage.object_storage_service import ObjectStorageClientService
from interfaces.http.exceptions.custom_exception_instances import SeverError
from typeguard import typechecked


@typechecked #$ This just validates the "download_file_pipeline" input (including objects) at runtime
async def download_file_pipeline(
    object_storage_provider: ObjectStorageClientService, 
    cryptography_provider: CryptographyService, 
    gzip_provider: GzipService, 
    file_id: str, 
    database_integrity_hash: str
):
    
    await object_storage_provider.download_file(file_id)
    await cryptography_provider.decrypt(file_id)

    integrity_hash_from_downloaded = await cryptography_provider.get_integrity_hash_of_compressed_file(file_id)

    if database_integrity_hash != integrity_hash_from_downloaded:
        raise SeverError(message="File integrity check failed")


    await gzip_provider.decompress(file_id)