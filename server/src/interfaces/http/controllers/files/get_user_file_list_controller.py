from fastapi import Depends
from fastapi.responses import JSONResponse
from entities.user_entity import User
from interfaces.http.dependencies.auth_user_provider import get_auth_user_provider

async def get_user_file_list_controller (
    authenticated_user: User = Depends(get_auth_user_provider),
)-> JSONResponse:

    files_list = authenticated_user.files


    return JSONResponse(status_code=200, content=[file.to_dto() for file in files_list])