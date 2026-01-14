from fastapi import Depends
from entities.user_entity import User
from interfaces.http.dependencies.auth_user_provider import get_auth_user_provider
from interfaces.schemas.shared import StandardResponse


async def get_user_file_list_controller (
    authenticated_user: User = Depends(get_auth_user_provider),
) -> StandardResponse:

    files_list = authenticated_user.files



    return {
        "success": True,
        "message": "File list retrieved successfully",
        "data": {
            "file_list": [file.to_dto() for file in files_list],
        }
    }