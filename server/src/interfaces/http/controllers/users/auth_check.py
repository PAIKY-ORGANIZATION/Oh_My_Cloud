from fastapi import Depends

from entities.user_entity import User
from interfaces.http.dependencies.auth_user_provider import get_auth_user_provider
from interfaces.schemas.shared import StandardResponse


async def auth_check_controller (authenticated_user: User = Depends(get_auth_user_provider)) -> StandardResponse:
    return {
        "success": True,
        "message": "User is authenticated",
        "data": authenticated_user.to_dto()
    }