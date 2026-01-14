from fastapi import UploadFile
from entities.user_entity import User
from interfaces.file_handling.startle_file_receiver_service import LimitExceededException, StartleFileReceiverService
from interfaces.http.exceptions.custom_exception_instances import UnprocessableEntity

from dataclasses import dataclass

@dataclass
class StoreFileLocallyUseCase():
    startle_file_receiver: StartleFileReceiverService


    async def execute(self, file: UploadFile, file_processing_uuid: str, user: User) -> int:

        #* About file size limit: 
            #$ the client can intentionally skip sending the file size (`Content-Length` header) so we can't depend on reading it. We need to warn the client's frontend about it's storage limit and also prevent big upload by counting chunk by chunk to NOT EXCEED their limit.

        remaining_user_storage = user.ENTITY_STORAGE_LIMIT_BYTES - user.consumed_storage_bytes


        try:
            file_size = await self.startle_file_receiver.write(file, file_processing_uuid, remaining_user_storage)
        except LimitExceededException:
            raise UnprocessableEntity('File size limit exceeded')
        except Exception as e:
            raise e #$ Bubble up
        
        return file_size