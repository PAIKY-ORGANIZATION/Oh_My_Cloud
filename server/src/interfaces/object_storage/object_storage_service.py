import asyncio
import os
from typing import cast

from interfaces.object_storage.object_storage_client import s3_client
from lib.paths import get_temp_encrypted_file_path
from lib.thread_executors import thread_pool

class ObjectStorageClientService:

    def __init__(self):
        self.s3_client = s3_client
        self.bucket_name = cast(str, os.environ.get('OBJECT_STORAGE_BUCKET_NAME'))


    def _upload_file_sync (self, file_processing_uuid: str):

        input_file_path_and_name = get_temp_encrypted_file_path(file_processing_uuid)

        with open (input_file_path_and_name, 'rb') as f:
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=file_processing_uuid,
                Body=f
            )

            
    async def upload_file(self, file_processing_uuid: str):
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(thread_pool, self._upload_file_sync, file_processing_uuid)

    
    def _download_file_sync(self, file_processing_uuid: str):

        CHUNK_SIZE = 1024 * 1024 #* 1MB
        response = self.s3_client.get_object(Bucket=self.bucket_name, Key=file_processing_uuid)
        output_file_path_and_name = get_temp_encrypted_file_path(file_processing_uuid)

        with open(output_file_path_and_name, 'wb') as f:
            while True:
                chunk = response['Body'].read(CHUNK_SIZE)
                if not chunk: break
                f.write(chunk)
                

    async def download_file(self, file_processing_uuid: str):
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(thread_pool, self._download_file_sync, file_processing_uuid)


    def _delete_file_sync (self, key: str):
        self.s3_client.delete_object(Bucket=self.bucket_name, Key=key)
        
    async def delete_file(self, key: str):
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(thread_pool, self._delete_file_sync, key)