
from fastapi import APIRouter
from interfaces.http.controllers.shareable_file_access.create_shareable_file_access_controller import create_shareable_file_access_controller
from interfaces.http.controllers.files.delete_file_controller import delete_file_controller
from interfaces.http.controllers.files.get_user_file_list_controller import get_user_file_list_controller
from interfaces.http.controllers.files.upload_file_controller import upload_file_controller
from interfaces.http.controllers.files.download_file_controller import download_file_controller


files_router = APIRouter(prefix="/files")




#* Files

files_router.post('/upload')(upload_file_controller)

files_router.get('/list')(get_user_file_list_controller)

files_router.get('/download/{file_id}')(download_file_controller)

files_router.delete('/delete/{file_id}')(delete_file_controller)