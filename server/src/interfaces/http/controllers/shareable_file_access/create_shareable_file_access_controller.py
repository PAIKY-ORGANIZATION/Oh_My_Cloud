import json
from fastapi import Body, Depends
from entities.user_entity import User
from interfaces.db.repositories.shareable_file_access_repository import ShareableFileAccessRepository
from interfaces.http.dependencies.auth_user_provider import get_auth_user_provider
from interfaces.http.dependencies.shareable_file_access_repository_provider import get_shareable_file_access_repository_provider
from interfaces.schemas.shareable_file_access.create_shareable_file_access_schemas import CreateFileAccessRequest
from interfaces.schemas.shared import StandardResponse
from use_cases.files.create_shareable_file_access_use_case import CreateFileAccessUseCase


async def create_shareable_file_access_controller(
    user: User = Depends(get_auth_user_provider), 
    body: CreateFileAccessRequest = Body(...),
    shareable_file_access_repository: ShareableFileAccessRepository = Depends(get_shareable_file_access_repository_provider),
) -> StandardResponse:

    create_shareable_file_access_use_case = CreateFileAccessUseCase(
        shareable_file_access_repository=shareable_file_access_repository,
    )
    
    print(json.dumps(body.model_dump(), indent=4))
    shareable_file_access = await create_shareable_file_access_use_case.execute(
        user, 
        body.file_id, 
        body.expiration_time, 
        body.expires_when_opened,
        password=body.password,
    )
    
    return {
        "success": True,
        "message": "Shareable link created successfully",
        "data": {
            "shareable_file_access_id": shareable_file_access.id
        }
    }