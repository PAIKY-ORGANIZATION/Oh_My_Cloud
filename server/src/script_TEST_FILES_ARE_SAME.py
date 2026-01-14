import subprocess
from bootstrap_env import load_env
from lib.paths import get_temp_compressed_file_path, get_temp_uncompressed_file_path
load_env()
from interfaces.file_handling.gzip_service import GzipService
from interfaces.file_handling.cryptography_service import CryptographyService
import asyncio

file_name = 'test_file.txt'





gzip_service = GzipService()
cryptography_service = CryptographyService()

async def main():

    binary = b'Hello, world!'

    with open(get_temp_uncompressed_file_path(file_name), 'wb') as f:
        f.write(binary)

    await gzip_service.compress(file_name)

    initial_integrity_hash = await cryptography_service.get_integrity_hash_of_compressed_file(file_name)
    print(initial_integrity_hash)
    
    await cryptography_service.encrypt(file_name)
    
    await cryptography_service.decrypt(file_name)

    final_integrity_hash = await cryptography_service.get_integrity_hash_of_compressed_file(file_name)
    print(final_integrity_hash)
    
    await gzip_service.decompress(file_name)

    with open(get_temp_uncompressed_file_path(file_name), 'rb') as f:
        final_binary = f.read()
        if final_binary == binary:
            print(f'🟢 Files are the same 🟢')
            print(f'Initial binary: {binary}')
            print(f'Final binary: {final_binary}')
        else:
            print(f'🔴 Files are different 🔴')
            print(f'Initial binary: {binary}')
            print(f'Final binary: {final_binary}')
    

    subprocess.run(f'rm {get_temp_uncompressed_file_path(file_name)}', shell=True)







asyncio.run(main())

