import asyncio
import os
import subprocess
from typing import cast
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import hashes

from lib.paths import get_temp_compressed_file_path, get_temp_encrypted_file_path
from lib.thread_executors import thread_pool


CHUNK_SIZE = 512 * 1024 # 512KB

class CryptographyService: 
    

    def __init__(self):
        key_hex_string = cast(str, os.environ.get('ENCRYPTION_KEY'))
        key_bytes_from_hex = bytes.fromhex(key_hex_string) #$ No encoding because these are not text characters in an encoding, it's just a hex representation of some bytes.
        self.algorithm = algorithms.AES(key_bytes_from_hex)
        



    #? Maybe put function code in a different file??????!
    def _encrypt_sync(self, file_processing_uuid: str)-> None: 
        nonce = os.urandom(16)
        mode = modes.CTR(nonce)
        cipher = Cipher(self.algorithm, mode) #$ Get Encryptor/Decryptor from this cipher
        encryptor = cipher.encryptor()

        input_file_path_and_name = get_temp_compressed_file_path(file_processing_uuid)
        output_file_path_and_name = get_temp_encrypted_file_path(file_processing_uuid)


        with open (input_file_path_and_name, 'rb') as f_in, open(output_file_path_and_name, 'wb') as f_out:
            f_out.write(nonce) #$ Storing the 16 bytes nonce in the beginning.
            while True:
                chunk = f_in.read(CHUNK_SIZE)
                if not chunk: break
                encrypted_chunk = encryptor.update(chunk)
                f_out.write(encrypted_chunk)
            final_encrypted_chunk = encryptor.finalize() #$ Flush any remaining "state"
            f_out.write(final_encrypted_chunk)
        subprocess.run(f'rm {input_file_path_and_name}', shell=True)
    
    async def encrypt(self, file_processing_uuid: str):
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(thread_pool, self._encrypt_sync, file_processing_uuid)






    def _decrypt_sync(self, file_processing_uuid: str):
        input_file_path_and_name = get_temp_encrypted_file_path(file_processing_uuid)
        output_file_path_and_name = get_temp_compressed_file_path(file_processing_uuid)
        with open(input_file_path_and_name, 'rb') as f_in, open(output_file_path_and_name, 'wb') as f_out:
            nonce = f_in.read(16) #$ By reading the nonce we consume that part and is not written to the output file.
            mode = modes.CTR(nonce)
            cipher = Cipher(self.algorithm, mode)
            decryptor = cipher.decryptor()
            while True:
                chunk = f_in.read(CHUNK_SIZE)
                if not chunk: break
                f_out.write(decryptor.update(chunk))
            f_out.write(decryptor.finalize())
        subprocess.run(f'rm {input_file_path_and_name}', shell=True)
        
    async def decrypt(self, file_processing_uuid: str):
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(thread_pool, self._decrypt_sync, file_processing_uuid)





    def _get_integrity_hash_of_compressed_file_sync(self, file_processing_uuid: str):
        algorithm = hashes.SHA256()
        sha256_hasher = hashes.Hash(algorithm) #$ This is already an object that can be updated and return hashed data.

        #? Maybe get the integrity hash after the compression?
        input_file_path_and_name = get_temp_compressed_file_path(file_processing_uuid)

        with open(input_file_path_and_name, 'rb') as f:
            while True:
                chunk = f.read(CHUNK_SIZE)
                if not chunk: break
                sha256_hasher.update(chunk)  #$ This will be mutating a hash of a fixed size.
                    #! So nothing will be "appended" to the hash.
        digest = sha256_hasher.finalize()
        return digest.hex()
    
    async def get_integrity_hash_of_compressed_file(self, file_processing_uuid: str) -> str:
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(thread_pool, self._get_integrity_hash_of_compressed_file_sync, file_processing_uuid)


