import os
from fastapi import Depends, File, UploadFile, BackgroundTasks
from fastapi.responses import JSONResponse

from entities.user_entity import User
from interfaces.db.repositories.file_repository import FileRepository
from interfaces.file_handling.cryptography_service import CryptographyService
from interfaces.file_handling.gzip_service import GzipService
from interfaces.file_handling.startle_file_receiver_service import StartleFileReceiverService
from interfaces.http.dependencies.auth_user_provider import get_auth_user_provider
from interfaces.http.dependencies.cryptography_provider import get_cryptography_provider
from interfaces.http.dependencies.gzip_provider import get_gzip_provider
from interfaces.http.dependencies.object_storage_provider import get_object_storage_provider
from interfaces.http.dependencies.startle_file_receiver_provider import get_startle_file_receiver_provider
from interfaces.object_storage.object_storage_service import ObjectStorageClientService
from use_cases.files.process_and_upload_use_case import ProcessAndUploadUseCase, ProcessAndUploadUseCaseExecuteInput
from use_cases.files.store_file_locally_use_case import StoreFileLocallyUseCase
from uuid import uuid4
from interfaces.http.dependencies.file_repository_provider import get_file_repository_provider

#! Something like RabbitMQ/NATS/Kafka would be a good fit for this but to keep things simple, we'll use a simple FastAPI background tasks + possible threads.

    #$ A scheduler like RabbitMQ/NATS/Kafka would allow:
        #$ 1. Scaling outside of the FastAPI application 
        #$ 2. Re-trying failed tasks 
        #$ 3. If the fastapi app dies the scheduler will be unaffected.
        #$ 4. Running CPU work in the same process as FastAPI will compete in the Event Loop against server requests.
        #$ 5. Etc...

    #$ RabbitMQ seems easy to use and is used a lot more than NATS.
    #$ Kafka is more complex (but more powerful) 
    #$ RabbitMQ can also scale (manually with container replicas or automatically with kubernetes)
    #$ So RabbitMQ is a goo fit.




async def upload_file_controller (
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., alias='my_field_name'),  #$ "..." for required
    gzip_provider: GzipService = Depends(get_gzip_provider),
    cryptography_provider: CryptographyService = Depends(get_cryptography_provider),
    startle_file_receiver: StartleFileReceiverService = Depends(get_startle_file_receiver_provider),
    object_storage_provider: ObjectStorageClientService = Depends(get_object_storage_provider),
    authenticated_user: User = Depends(get_auth_user_provider), #* This handles authentication.
    file_repository: FileRepository = Depends(get_file_repository_provider),
)-> JSONResponse:
   
    #* Cleanup file_name
    safe_filename = os.path.basename(file.filename or 'no_filename_provided') #$ Strip any, likely maliciously appended path info Ej: `../../etc/passwd.txt` -> `passwd.txt`
    file_processing_uuid = str(uuid4())

    #* Store locally
    store_file_locally_use_case = StoreFileLocallyUseCase(startle_file_receiver)
    file_size = await store_file_locally_use_case.execute(file, file_processing_uuid, authenticated_user)

    #* Process and upload to object storage
    process_and_upload_use_case = ProcessAndUploadUseCase(
        gzip_provider, 
        cryptography_provider, 
        object_storage_provider, 
        file_repository
    )

    input_dict: ProcessAndUploadUseCaseExecuteInput = {
        "id": file_processing_uuid,
        "safe_file_name": safe_filename,
        "original_file_name": file.filename or 'no_filename_provided',
        "original_file_size": file_size,
        "owner_id": authenticated_user.id,
    }
    
    background_tasks.add_task(process_and_upload_use_case.execute, input=input_dict) #$ Don't need to await this. It is just scheduling. FastAPI will run it when possible.


    return  JSONResponse(status_code=200, content={
        "success": True,
        "message": "File uploaded successfully",
        "data": {
            "file_id": file_processing_uuid,
        }
    })
