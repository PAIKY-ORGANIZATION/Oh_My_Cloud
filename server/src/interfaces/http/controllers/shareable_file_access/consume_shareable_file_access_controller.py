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


    incoming_password = request.headers.get("Authorization")
    try:
        if incoming_password: incoming_password = incoming_password.split(" ")[1]
    except Exception as e:
        raise Unauthorized("You must send a valid Bearer token")	#$ Avoids crashes when extracting a badly formatted token.
    

    try:
        file_id, file_name = await consume_file_access_use_case.execute(shareable_file_access_id, incoming_password)
    except NeedsRedirect:
        return RedirectResponse(url=f"/shareable/protected/{shareable_file_access_id}") #? This doesn't exist yet. It needs to be an actual interactive page.
    except Exception as e:
        raise e #$ Bubble up
    
    return FileResponse(
        path=get_temp_uncompressed_file_path(file_id),
        # media_type='application/octet-stream', #! FastAPI can guess the media type of the file. It uses the file extension with the Python "mimetypes" library.
        filename=file_name,
    )