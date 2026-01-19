
from typing import Any, Optional, TypedDict
from fastapi import Request
from fastapi.encoders import jsonable_encoder

from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from interfaces.http.exceptions.custom_exception_instances  import AppError, SeverError, UnprocessableEntity
from interfaces.http.exceptions.rich_error_formater import rich_error_formater

class ErrorResponse(TypedDict):
    message: str
    error_code: str
    details: Optional[Any]


def _return_app_error_response(exc: AppError) -> JSONResponse:
    content: ErrorResponse = {
        "message": exc.message,
        "error_code": exc.error_code,
        "details": exc.details,
        # "success": False, #$ This is redundant because the status code already exists
    }


    return JSONResponse(
        status_code=exc.status_code,
        content=content
    ) 




async def global_exception_handler(_request: Request, exc: Exception):
    try:
        rich_error_formater(exc)
    except:
        print('Error formatting error with rich.')
    
    return _return_app_error_response(SeverError())



async def validation_error_handler(_request: Request, exc: RequestValidationError):

    safe_details: dict[str, Any] = jsonable_encoder(exc.errors()) #$ In some rare cases `exc.errors()` (a dict) may contain a value that is, for example an actual Python error (like TypeError). 
    #$ Why not "json.dumps(exc.errors())"? Because it only serializes VALID dicts that can be serialized to JSON.
    #$ JSONResponse also uses json.dumps" so it will also fail.
    #$ jsonable_encoder converts many common FastAPI-relevant Python objects into JSON-compatible primitives. It does not guarantee correctness for arbitrary objects though.

    error = UnprocessableEntity(message='Validation error, read details', details=safe_details) #$ Send the  Pydantic JSON in the details.
    return _return_app_error_response(error)



async def app_error_handler(_request: Request, exc: AppError):
    return _return_app_error_response(exc)