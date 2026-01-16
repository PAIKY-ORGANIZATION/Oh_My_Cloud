from fastapi import Depends
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
from interfaces.object_storage.object_storage_service import ObjectStorageClientService
from interfaces.schemas.users.delete_user_schemas import DeleteUserRequest
from lib.variables import auth_cookie_name
from use_cases.users.delete_user_use_case import DeleteUserUseCase
from fastapi import Body


async def delete_user_controller(
    body: DeleteUserRequest = Body(...), #$ Body(...) is used to make the body required
    user: User = Depends(get_auth_user_provider),
    user_repository: UserRepository = Depends(get_user_repository_provider),
    hasher: BcryptHasherService = Depends(get_hasher_provider),
    object_storage_provider: ObjectStorageClientService = Depends(get_object_storage_provider),
    file_repository: FileRepository = Depends(get_file_repository_provider),
)-> JSONResponse:
    

    delete_user_use_case = DeleteUserUseCase(user_repository, file_repository, hasher, object_storage_provider)

    await delete_user_use_case.execute(user, body.password)

    response = JSONResponse(status_code=200, content=None)
    response.delete_cookie(key=auth_cookie_name)
    return response