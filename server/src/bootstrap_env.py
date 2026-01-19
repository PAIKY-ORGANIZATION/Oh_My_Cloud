import os
from dotenv import load_dotenv




required_env_variables = [
    "DEV", #$ True/False for "reload" in uvicorn.run()
    "DATABASE_URL_PARTIAL",
    "JWT_SECRET",
    "ENCRYPTION_KEY",
    "OBJECT_STORAGE_ACCESS_KEY_ID",
    "OBJECT_STORAGE_SECRET_ACCESS_KEY",
    "OBJECT_STORAGE_REGION",
    "OBJECT_STORAGE_ENDPOINT_URL",
    "OBJECT_STORAGE_BUCKET_NAME",
    "FRONTEND_BASE_URL",
]

def load_env_from_local_files():
    load_dotenv("./config/shared.env")
    load_dotenv(f"./config/{os.environ.get('ENVIRONMENT')}.env")


def validate_env():
    for env_variable in required_env_variables:
        if not os.environ.get(env_variable):
            raise ValueError(f"Environment variable {env_variable} is not set")