import asyncio
import subprocess
from fastapi import UploadFile

from lib.paths import get_temp_uncompressed_file_path
from lib.thread_executors import thread_pool




#% For explanation: 8-python-fastapi/src/learning_modules/_9X9_2_streaming_file_NON_BLOCKING.py


CHUNK_SIZE = 1024 * 1024 # 1MB #? This seems to be the high end of chunk sizes.

class LimitExceededException(Exception):
    pass

class StartleFileReceiverService():

    def _write_file_sync(self, file: UploadFile, file_processing_uuid: str, limit_bytes: int) -> int: 
        
        output_file_path_and_name = get_temp_uncompressed_file_path(file_processing_uuid)

        with open(output_file_path_and_name, 'wb') as f:
            total_bytes_written = 0
            
            while True:
                chunk = file.file.read(CHUNK_SIZE)
                if not chunk: break

                total_bytes_written += len(chunk)
                if total_bytes_written > limit_bytes:
                    subprocess.run(f'rm {output_file_path_and_name}', shell=True) #! This might be discouraged
                    raise LimitExceededException()

                f.write(chunk) 

            return total_bytes_written
        
    
    async def write(self, file: UploadFile, file_processing_uuid: str, limit_bytes: int):

        loop = asyncio._get_running_loop()
        return await loop.run_in_executor(thread_pool, self._write_file_sync, file, file_processing_uuid, limit_bytes)
    