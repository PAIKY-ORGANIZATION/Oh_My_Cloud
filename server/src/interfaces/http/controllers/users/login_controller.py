from fastapi import Depends, Response
from fastapi.responses import JSONResponse
from interfaces.db.repositories.user_repository import UserRepository
from interfaces.hashing.bcrypt_hasher_service import BcryptHasherService
from interfaces.http.dependencies.hash_provider import get_hasher_provider
from interfaces.http.dependencies.jwt_provider import get_jwt_provider
from interfaces.http.dependencies.user_repository_provider import get_user_repository_provider
from interfaces.jwt_interface.jwt_service import JWTService
from interfaces.schemas.users.login_user_schema import UserLoginRequest
from lib.variables import auth_cookie_name
from use_cases.users.login_user_use_case import LoginUserUseCase

async def login_controller (
    body: UserLoginRequest, 
    response: Response, 
    hasher: BcryptHasherService = Depends(get_hasher_provider),
    jwt: JWTService = Depends(get_jwt_provider),
    user_repository: UserRepository = Depends(get_user_repository_provider)
)-> JSONResponse:


    token: str = await LoginUserUseCase(user_repository, hasher, jwt).execute(user_data=body)

    response.set_cookie(key=auth_cookie_name, value=token, httponly=True,)

    return JSONResponse(status_code=200, content=None)