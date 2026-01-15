from fastapi import Depends
from fastapi.responses import JSONResponse
from entities.user_entity import User
from interfaces.db.repositories.file_repository import FileRepository
from interfaces.http.dependencies.auth_user_provider import get_auth_user_provider
from interfaces.http.dependencies.file_repository_provider import get_file_repository_provider
from interfaces.http.dependencies.object_storage_provider import get_object_storage_provider
from interfaces.object_storage.object_storage_service import ObjectStorageClientService
from use_cases.files.delete_file_use_case import DeleteFileUseCase


async def delete_file_controller(
    file_id: str, 
    user: User = Depends(get_auth_user_provider),
    object_storage_provider: ObjectStorageClientService = Depends(get_object_storage_provider),
    file_repository: FileRepository = Depends(get_file_repository_provider),
)-> JSONResponse:


    delete_file_use_case = DeleteFileUseCase(
        file_repo=file_repository, 
        object_storage_provider=object_storage_provider
    )
    
    await delete_file_use_case.execute(file_id, user)

    return JSONResponse(status_code=200, content=file_id)