from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from entities.user_entity import User 
from interfaces.http.dependencies.db_session_provider import get_db_session_provider
from interfaces.http.dependencies.jwt_provider import get_jwt_provider
from interfaces.http.exceptions.custom_exception_instances import Unauthorized
from interfaces.jwt_interface.jwt_service import JWTPayload, JWTService
from interfaces.db.repositories.user_repository import UserRepository
from lib.variables import auth_cookie_name


async def get_auth_user_provider (
    request: Request, 
    jwt_provider: JWTService = Depends(get_jwt_provider),
    session: AsyncSession = Depends(get_db_session_provider)
) -> User:


    print(request.cookies)

    payload: JWTPayload = jwt_provider.verify_jwt(request.cookies.get(auth_cookie_name) or '')
    user_repo = UserRepository(session)
    user = await user_repo.find_by_id(payload['user_id'])

    if not user: raise Unauthorized('User not found for provided token')

    return user
    
    
