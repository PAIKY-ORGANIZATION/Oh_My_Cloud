from fastapi import Body, Depends
from fastapi.responses import JSONResponse
from entities.user_entity import User
from interfaces.db.repositories.shareable_file_access_repository import ShareableFileAccessRepository
from interfaces.http.dependencies.auth_user_provider import get_auth_user_provider
from interfaces.http.dependencies.shareable_file_access_repository_provider import get_shareable_file_access_repository_provider
from interfaces.schemas.shareable_file_access.create_shareable_file_access_schemas import CreateFileAccessRequest
from use_cases.files.create_shareable_file_access_use_case import CreateFileAccessUseCase


async def create_shareable_file_access_controller(
    user: User = Depends(get_auth_user_provider), 
    body: CreateFileAccessRequest = Body(...),
    shareable_file_access_repository: ShareableFileAccessRepository = Depends(get_shareable_file_access_repository_provider),
)-> JSONResponse:

    create_shareable_file_access_use_case = CreateFileAccessUseCase(
        shareable_file_access_repository=shareable_file_access_repository,
    )
    shareable_file_access = await create_shareable_file_access_use_case.execute(
        user, 
        body.file_id, 
        body.expiration_time, 
        body.expires_when_opened,
        password=body.password,
    )


    path_to_shareable_file_access = f"/shareable/{shareable_file_access.id}"
    
    return JSONResponse(status_code=201, content={
        "path_to_shareable_file_access": path_to_shareable_file_access,
    })