



import asyncio
import gzip
import subprocess
from lib.paths import get_temp_compressed_file_path, get_temp_uncompressed_file_path
from lib.thread_executors import thread_pool

COMPRESS_CHUNK_SIZE = 8 * 1024 * 1024  # 8 MiB chunks

class GzipService:

    #* ==== Compression ====    
    def _compress_sync(self, file_processing_uuid: str) -> None: #$ `ej: abc.txt`

    
        input_file_name_and_path = get_temp_uncompressed_file_path(file_processing_uuid)
        output_file_name_and_path = get_temp_compressed_file_path(file_processing_uuid)

        with open(input_file_name_and_path, 'rb') as f_in:
            with gzip.open(output_file_name_and_path, 'wb') as f_out:
                while True:
                    chunk = f_in.read(COMPRESS_CHUNK_SIZE)
                    if not chunk: break
                    f_out.write(chunk)

        subprocess.run(f'rm {input_file_name_and_path}', shell=True) #! This might be discouraged


    async def compress(self, file_processing_uuid: str):
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(thread_pool, self._compress_sync, file_processing_uuid)




    #* ==== Decompression ====

    def _decompress_sync(self, file_processing_uuid: str):

        input_file_name_and_path = get_temp_compressed_file_path(file_processing_uuid)
        output_file_name_and_path = get_temp_uncompressed_file_path(file_processing_uuid)

        with gzip.open(input_file_name_and_path, 'rb') as f_in:
            with open(output_file_name_and_path, 'wb') as f_out:
                while True:
                    chunk = f_in.read(COMPRESS_CHUNK_SIZE)
                    if not chunk: break
                    f_out.write(chunk)

        subprocess.run(f'rm {input_file_name_and_path}', shell=True) #! This might be discouraged

    async def decompress(self, file_processing_uuid: str):

        loop = asyncio.get_running_loop()
        await loop.run_in_executor(thread_pool, self._decompress_sync, file_processing_uuid)