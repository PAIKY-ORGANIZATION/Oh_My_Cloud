from fastapi import Depends
from fastapi.responses import JSONResponse

from entities.user_entity import User
from interfaces.http.dependencies.auth_user_provider import get_auth_user_provider


async def auth_check_controller (authenticated_user: User = Depends(get_auth_user_provider))-> JSONResponse:
    return JSONResponse(
        status_code=200,
        content=authenticated_user.to_dto()
    )