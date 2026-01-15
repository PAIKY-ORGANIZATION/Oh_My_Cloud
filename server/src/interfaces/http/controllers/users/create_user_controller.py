from fastapi.responses import JSONResponse
from entities.user_entity import User 
from interfaces.db.repositories.user_repository import UserRepository
from interfaces.hashing.bcrypt_hasher_service import BcryptHasherService
from interfaces.http.dependencies.hash_provider import get_hasher_provider
from interfaces.http.dependencies.user_repository_provider import get_user_repository_provider
from interfaces.schemas.users.create_user_schemas import UserCreateRequest
from  use_cases.users.create_user_use_case import CreateUserUseCase
from fastapi import Depends, Body






async def create_user_controller (
    body: UserCreateRequest = Body(...),  #$ Body(...) is used to make the body required
    hasher: BcryptHasherService = Depends(get_hasher_provider),
    user_repository: UserRepository = Depends(get_user_repository_provider)
)-> JSONResponse: 


    new_user: User = await CreateUserUseCase(user_repository, hasher).execute(user_data=body)

    return JSONResponse(status_code=201, content=new_user.to_dto())
