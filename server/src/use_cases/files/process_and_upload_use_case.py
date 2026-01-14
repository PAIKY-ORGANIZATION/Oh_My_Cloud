from typing import TypedDict
from entities.file_entity import File
from interfaces.db.repositories.file_repository import FileRepository
from interfaces.file_handling.cryptography_service import CryptographyService
from interfaces.file_handling.gzip_service import GzipService
from interfaces.object_storage.object_storage_service import ObjectStorageClientService
from dataclasses import dataclass
from typeguard import typechecked

class ProcessAndUploadUseCaseExecuteInput(TypedDict):
    id: str
    safe_file_name: str
    original_file_name: str
    original_file_size: int
    owner_id: str 



@dataclass()
class ProcessAndUploadUseCase():
    gzip_provider: GzipService
    cryptography_provider: CryptographyService
    object_storage_provider: ObjectStorageClientService
    file_repository: FileRepository


    @typechecked #$ This just validates the "ProcessAndUploadUseCaseExecuteInput" at runtime
    async def execute(self, *, input: ProcessAndUploadUseCaseExecuteInput):

        await self.gzip_provider.compress(input['id'])

        integrity_hash = await self.cryptography_provider.get_integrity_hash_of_compressed_file(input['id'])

        await self.cryptography_provider.encrypt(input['id'])
        
        await self.object_storage_provider.upload_file(input['id'])

        file = File(**input, integrity_hash=integrity_hash)

        await self.file_repository.save(file)













#* If needed:
# $ Why dataclass/Pydantic model? We rarely just pass the input of a function to the File() entity params. We first construct a separate specific dict and then pass it to the File() entity, so what is the point?
#     $ In other words, we don't usually pass the plain data of an object into another object, we pass the object itself.
#         $ If you think about it, in javascript we rarely used "...object" unless we wanted to user "...object, other, other".

#¡ Actually, dataclasses are not validated at runtime lol.