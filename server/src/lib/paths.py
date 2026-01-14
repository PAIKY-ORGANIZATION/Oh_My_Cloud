import os
import subprocess



PARENT_TEMP_DIRNAME = 'temp'

UNCOMPRESSED_FILES_DIRNAME="uncompressed_files"
COMPRESSED_FILES_DIRNAME = 'compressed_files'
ENCRYPTED_FILES_DIRNAME = 'encrypted_files'





def get_temp_uncompressed_file_path(file_name: str):
    #$ Ej: ./temp/uncompressed_files/file_name.txt
    return os.path.join(PARENT_TEMP_DIRNAME, UNCOMPRESSED_FILES_DIRNAME, file_name) 

def get_temp_compressed_file_path(file_name: str):
    #$ Ej: ./temp/compressed_files/file_name.gz
    return os.path.join(PARENT_TEMP_DIRNAME, COMPRESSED_FILES_DIRNAME, f'{file_name}.gz')


def get_temp_encrypted_file_path(file_name: str):
    #$ Ej: ./temp/encrypted_files/file_name.txt
    return os.path.join(PARENT_TEMP_DIRNAME, ENCRYPTED_FILES_DIRNAME, file_name)

    




#* ==== Creating the directories ====

subprocess.run(f'mkdir -p {os.path.join(PARENT_TEMP_DIRNAME, UNCOMPRESSED_FILES_DIRNAME)}', shell=True) #! Generally discouraged lol

subprocess.run(f'mkdir -p {os.path.join(PARENT_TEMP_DIRNAME, COMPRESSED_FILES_DIRNAME)}', shell=True) #! Generally discouraged lol

subprocess.run(f'mkdir -p {os.path.join(PARENT_TEMP_DIRNAME, ENCRYPTED_FILES_DIRNAME)}', shell=True) #! Generally discouraged lol

