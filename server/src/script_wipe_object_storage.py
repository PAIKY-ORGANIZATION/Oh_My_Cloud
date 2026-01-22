


import bootstrap_env
bootstrap_env.load_env_from_local_files()



import os
from typing import cast
from interfaces.object_storage.object_storage_client import s3_client

bucket_name = cast(str, os.environ.get('OBJECT_STORAGE_BUCKET_NAME'))


def wipe_object_storage():
    object_list = s3_client.list_objects_v2(Bucket=bucket_name)
    for object in object_list['Contents']: # type: ignore
        s3_client.delete_object(Bucket=bucket_name, Key=object['Key']) # type: ignore

        #¡ Might take some time


wipe_object_storage()