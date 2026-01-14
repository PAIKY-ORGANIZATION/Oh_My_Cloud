import asyncio
from entities.user_entity import User
from interfaces.db.repositories.file_repository import FileRepository
from interfaces.db.repositories.user_repository import UserRepository
from interfaces.hashing.bcrypt_hasher_service import BcryptHasherService
from interfaces.http.exceptions.custom_exception_instances import Unauthorized
from interfaces.object_storage.object_storage_service import ObjectStorageClientService

from dataclasses import dataclass



@dataclass
class DeleteUserUseCase():
    user_repository: UserRepository
    file_repository: FileRepository
    hasher: BcryptHasherService
    object_storage_provider: ObjectStorageClientService


    async def execute(self, user: User, password: str):

        password_match = await self.hasher.verify_password_async(
            unhashed_password=password, 
            hashed_password=user.password
        )

        if not password_match:
            raise Unauthorized(message="Invalid password")
        
        #! Delete files before deleting the user.
        # await asyncio.gather(*[ #! An SQLAlchemy session can't concurrently delete files. For that you would need separate sessions for each transaction.
        #     self.file_repository.delete(file)
        #     for file in user.files
        # ]) 


        #! This takes a bit of TIME. You can also schedule it with a FastAPI background task. However this way we can send an error-response right back if something fails.
        await asyncio.gather(*[
            self.object_storage_provider.delete_file(file.id)
            for file in user.files
        ])

        await self.user_repository.delete(user) #! This will cascade delete the files. If it really takes much time you can schedule it with a FastAPI background task.