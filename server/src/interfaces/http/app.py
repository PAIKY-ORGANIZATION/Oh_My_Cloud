import os
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from interfaces.http.exceptions.custom_exception_instances  import AppError
from interfaces.http.exceptions.exception_handlers import app_error_handler, global_exception_handler, validation_error_handler
from interfaces.http.routers.files_router import files_router
from interfaces.http.routers.shareable_file_access_router import shareable_file_access_router
from interfaces.http.routers.users_router import users_router
from fastapi.middleware.cors import CORSMiddleware






app = FastAPI()

app.include_router(users_router)
app.include_router(files_router)
app.include_router(shareable_file_access_router)



app.exception_handler(RequestValidationError)(validation_error_handler)
app.exception_handler(Exception)(global_exception_handler)
app.exception_handler(AppError)(app_error_handler)



frontend_base_url = os.environ.get("FRONTEND_BASE_URL", "").strip()

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:3000"],
    # allow_origins=["http://localhost:4000"],
    # allow_origins=["*"],
    allow_origins=[frontend_base_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)