from fastapi import Depends, Request
from fastapi.responses import JSONResponse
from entities.user_entity import User
from interfaces.db.repositories.file_repository import FileRepository
from interfaces.db.repositories.user_repository import UserRepository
from interfaces.hashing.bcrypt_hasher_service import BcryptHasherService
from interfaces.http.dependencies.auth_user_provider import get_auth_user_provider
from interfaces.http.dependencies.file_repository_provider import get_file_repository_provider
from interfaces.http.dependencies.hash_provider import get_hasher_provider
from interfaces.http.dependencies.object_storage_provider import get_object_storage_provider
from interfaces.http.dependencies.user_repository_provider import get_user_repository_provider
from interfaces.http.exceptions.custom_exception_instances import Unauthorized
from interfaces.object_storage.object_storage_service import ObjectStorageClientService
from lib.variables import auth_cookie_name
from use_cases.users.delete_user_use_case import DeleteUserUseCase

async def delete_user_controller(
    request: Request,
    user: User = Depends(get_auth_user_provider),
    user_repository: UserRepository = Depends(get_user_repository_provider),
    hasher: BcryptHasherService = Depends(get_hasher_provider),
    object_storage_provider: ObjectStorageClientService = Depends(get_object_storage_provider),
    file_repository: FileRepository = Depends(get_file_repository_provider),
)-> JSONResponse:

    password = request.headers.get("X-User-Password")    #$ "X-" is a convention for non-standard, application-specific headers.
    
    if not password: raise Unauthorized(message="Password is required as a safety measure")

    delete_user_use_case = DeleteUserUseCase(user_repository, file_repository, hasher, object_storage_provider)
    
    await delete_user_use_case.execute(user, password)

    response = JSONResponse(status_code=200, content=None)
    response.delete_cookie(key=auth_cookie_name)
    return response