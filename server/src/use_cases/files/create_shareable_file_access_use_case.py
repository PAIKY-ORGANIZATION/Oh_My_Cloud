from dataclasses import dataclass
from typing import Optional
from entities.user_entity import User
from entities.shareable_file_access_entity import ShareableFileAccess
from interfaces.db.repositories.shareable_file_access_repository import ShareableFileAccessRepository
from interfaces.http.exceptions.custom_exception_instances import ItemNotFound
from interfaces.schemas.shareable_file_access.create_shareable_file_access_schemas import ExpirationTime

from utils.time_formater_util import time_formatter

@dataclass
class CreateFileAccessUseCase():

    shareable_file_access_repository: ShareableFileAccessRepository
    
    async def execute(
        self, 
        user: User, 
        file_id: str, 
        expiration_time: Optional[ExpirationTime], 
        expires_when_opened: bool,
        password: Optional[str]
    ):
        
        found_user_file = next((file for file in user.files if file.id == file_id), None)

        if not found_user_file: raise ItemNotFound(message="File not found or doesn't belong to the user")

        expires_at = time_formatter(expiration_time) if expiration_time else None

        shareable_file_access = ShareableFileAccess(
            password=password,
            file_id=file_id,
            expires_at=expires_at,
            expires_when_opened=expires_when_opened,
        )

        await self.shareable_file_access_repository.save(shareable_file_access)
        
        return shareable_file_access