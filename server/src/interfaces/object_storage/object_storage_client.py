import os
from typing import cast
from boto3 import client # type: ignore #! This is a type error due to one of MANY OVERLOADS that is not typed or returns "unknown". Because of a single untyped overload, Pyright will complain about the whole `client` being unknown.

from mypy_boto3_s3.client import S3Client 

s3_client: S3Client = client(
    service_name='s3',
    region_name=cast(str, os.environ.get('OBJECT_STORAGE_REGION')),
    aws_access_key_id=cast(str, os.environ.get('OBJECT_STORAGE_ACCESS_KEY_ID')),
    aws_secret_access_key=cast(str, os.environ.get('OBJECT_STORAGE_SECRET_ACCESS_KEY')),
    endpoint_url=cast(str, os.environ.get('OBJECT_STORAGE_ENDPOINT_URL')), #$ Only required for OBJECT_STORAGE.
)