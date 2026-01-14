from dataclasses import dataclass

from entities.user_entity import User
from interfaces.db.repositories.file_repository import FileRepository
from interfaces.http.exceptions.custom_exception_instances import ItemNotFound
from interfaces.object_storage.object_storage_service import ObjectStorageClientService


@dataclass
class DeleteFileUseCase():
    
    file_repo: FileRepository
    object_storage_provider: ObjectStorageClientService

    async def execute(self, file_id: str, user: User):
        user_file = next((file for file in user.files if file.id == file_id), None)

        if not user_file: raise ItemNotFound(message="File not found or doesn't belong to the user")

        await self.file_repo.delete(user_file)

        await self.object_storage_provider.delete_file(user_file.id)