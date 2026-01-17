import os
from typing import cast
from fastapi import Depends, Request
from interfaces.db.repositories.shareable_file_access_repository import ShareableFileAccessRepository
from interfaces.http.dependencies.shareable_file_access_repository_provider import get_shareable_file_access_repository_provider
from interfaces.http.exceptions.custom_exception_instances import Unauthorized
from interfaces.http.dependencies.object_storage_provider import get_object_storage_provider
from interfaces.http.dependencies.gzip_provider import get_gzip_provider
from interfaces.http.dependencies.cryptography_provider import get_cryptography_provider
from interfaces.http.dependencies.file_repository_provider import get_file_repository_provider
from interfaces.object_storage.object_storage_service import ObjectStorageClientService
from interfaces.file_handling.gzip_service import GzipService
from interfaces.file_handling.cryptography_service import CryptographyService
from interfaces.db.repositories.file_repository import FileRepository
from lib.paths import get_temp_uncompressed_file_path
from use_cases.files.consume_shareable_file_access_use_case import ConsumeFileAccessUseCase, NeedsRedirect
from fastapi.responses import RedirectResponse, FileResponse

async def consume_shareable_file_access_controller (
    shareable_file_access_id: str,
    request: Request,
    object_storage_provider: ObjectStorageClientService = Depends(get_object_storage_provider),
    gzip_provider: GzipService = Depends(get_gzip_provider),
    cryptography_provider: CryptographyService = Depends(get_cryptography_provider),
    file_repository: FileRepository = Depends(get_file_repository_provider),
    shareable_file_access_repository: ShareableFileAccessRepository = Depends(get_shareable_file_access_repository_provider),
):
    
    consume_file_access_use_case = ConsumeFileAccessUseCase(
        shareable_file_access_repository=shareable_file_access_repository,
        object_storage_provider=object_storage_provider,
        gzip_provider=gzip_provider,
        cryptography_provider=cryptography_provider,
        file_repository=file_repository,
    )

    #! Don't use "Authorization" (Beater) because it indicates that it's a short-lived, ephemeral token (even though you  can  technically use it for any kind of authentication)
    incoming_password = request.headers.get("X-File-Password") #$ "X-" is a convention for non-standard, application-specific headers.

    try:
        file_id, file_name = await consume_file_access_use_case.execute(shareable_file_access_id, incoming_password)
    except NeedsRedirect:
        redirect_url = f"{cast(str, os.environ.get("FRONTEND_BASE_URL"))}/unlock_shareable_file_access/{shareable_file_access_id}" #! This will only work with a frontend.
        return RedirectResponse(url=redirect_url)
    except Exception as e:
        raise e #$ Bubble up
    
    return FileResponse(
        path=get_temp_uncompressed_file_path(file_id),
        # media_type='application/octet-stream', #! FastAPI can guess the media type of the file. It uses the file extension with the Python "mimetypes" library.
        filename=file_name,
    )