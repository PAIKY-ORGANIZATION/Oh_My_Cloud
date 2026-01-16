from fastapi.responses import FileResponse
from entities.user_entity import User
from interfaces.db.repositories.file_repository import FileRepository
from interfaces.file_handling.cryptography_service import CryptographyService
from interfaces.file_handling.gzip_service import GzipService
from interfaces.http.dependencies.auth_user_provider import get_auth_user_provider
from interfaces.http.dependencies.cryptography_provider import get_cryptography_provider
from interfaces.http.dependencies.file_repository_provider import get_file_repository_provider
from interfaces.http.dependencies.gzip_provider import get_gzip_provider
from interfaces.http.dependencies.object_storage_provider import get_object_storage_provider
from interfaces.object_storage.object_storage_service import ObjectStorageClientService
from lib.paths import get_temp_uncompressed_file_path
from use_cases.files.download_file_use_case import DownloadFileUseCase
from fastapi import Depends, Path

async def download_file_controller (
    gzip_provider: GzipService = Depends(get_gzip_provider),
    cryptography_provider: CryptographyService = Depends(get_cryptography_provider),
    object_storage_provider: ObjectStorageClientService = Depends(get_object_storage_provider),
    authenticated_user: User = Depends(get_auth_user_provider), #* This handles authentication.
    file_repository: FileRepository = Depends(get_file_repository_provider),
    file_id: str = Path(...)
) -> FileResponse:
    

    download_file_use_case = DownloadFileUseCase(file_repository, object_storage_provider, gzip_provider, cryptography_provider)
    file_name = await download_file_use_case.execute(authenticated_user, file_id)

    return FileResponse(
        path=get_temp_uncompressed_file_path(file_id),
        # media_type='application/octet-stream', #! FastAPI can guess the media type of the file. It uses the file extension with the Python "mimetypes" library.
        filename=file_name,
    )

    #? Delete the uncompressed file after the response is sent. Use a background task.