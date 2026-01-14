from datetime import datetime, timezone
from typing import Optional
from dataclasses import dataclass

from interfaces.db.repositories.file_repository import FileRepository
from interfaces.db.repositories.shareable_file_access_repository import ShareableFileAccessRepository
from interfaces.http.exceptions.custom_exception_instances import ItemNotFound, Unauthorized


from interfaces.file_handling.cryptography_service import CryptographyService
from interfaces.file_handling.gzip_service import GzipService
from interfaces.object_storage.object_storage_service import ObjectStorageClientService
from use_cases.shared.download_file_pipeline import download_file_pipeline


class NeedsRedirect(Exception):
    pass

@dataclass
class ConsumeFileAccessUseCase():
    
    shareable_file_access_repository: ShareableFileAccessRepository
    object_storage_provider: ObjectStorageClientService
    gzip_provider: GzipService
    cryptography_provider: CryptographyService
    file_repository: FileRepository

    async def execute(
        self, shareable_file_access_id: str, 
        incoming_password: Optional[str]
    ) ->tuple[str, str]:
        
        shareable_file_access = await self.shareable_file_access_repository.find_by_id(shareable_file_access_id)

        if not shareable_file_access: raise ItemNotFound(message="Shareable link not found")

        #¡ Passwords are not hashed
        if shareable_file_access.password:
            if not incoming_password:
                raise NeedsRedirect()

            if shareable_file_access.password != incoming_password:
                raise Unauthorized(message="Invalid password")

        if shareable_file_access.expires_at:
            if shareable_file_access.expires_at < datetime.now(timezone.utc):
                raise Unauthorized(message="Shareable link has expired")

        file = await self.file_repository.find_by_id(shareable_file_access.file_id)
        if not file: raise ItemNotFound(message="File not found")
        
        await download_file_pipeline(
            self.object_storage_provider, 
            self.cryptography_provider, 
            self.gzip_provider, 
            file.id, 
            file.integrity_hash
        )

        if shareable_file_access.expires_when_opened:
            #$ If "expires_when_opened" is true, set the "expires_at" to the current datetime to expire the access.
            shareable_file_access.expires_at = datetime.now(timezone.utc)
            await self.shareable_file_access_repository.save(shareable_file_access)
            print(f'🟢 Expired 🟢')

        return file.id, file.safe_file_name #! No redirect needed.