from dataclasses import dataclass
from entities.user_entity import User
from interfaces.db.repositories.file_repository import FileRepository
from interfaces.file_handling.cryptography_service import CryptographyService
from interfaces.file_handling.gzip_service import GzipService
from interfaces.object_storage.object_storage_service import ObjectStorageClientService

from interfaces.http.exceptions.custom_exception_instances import ItemNotFound
from use_cases.shared.download_file_pipeline import download_file_pipeline

@dataclass
class DownloadFileUseCase():
    file_repository: FileRepository
    object_storage_provider: ObjectStorageClientService
    gzip_provider: GzipService
    cryptography_provider: CryptographyService

    async def execute(self, user: User, file_id: str) -> str:
        
        found_user_file = next((file for file in user.files if file.id == file_id), None) #$ "None" is the default value if no file is found.

        if not found_user_file:
            raise ItemNotFound("File doesn't exist or doesn't belong to provided user")
        
        await download_file_pipeline(
            self.object_storage_provider, 
            self.cryptography_provider, 
            self.gzip_provider, 
            found_user_file.id, 
            found_user_file.integrity_hash
        )

        return found_user_file.safe_file_name

