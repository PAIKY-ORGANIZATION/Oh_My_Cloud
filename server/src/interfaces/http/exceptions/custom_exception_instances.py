from dataclasses import dataclass
from typing import Any, Optional

@dataclass
class AppError(Exception):

    message: str
    status_code: int
    error_code: str
    details: Optional[Any] = None

    def __post_init__(self):
        super().__init__(self.message)


class SeverError(AppError):
    def __init__(self, details: Optional[Any] = None, message: Optional[str] = None):
        super().__init__(
            message=message or 'An unexpected error occurred', 
            status_code=500, 
            details=details, 
            error_code="INTERNAL"
        )


class BadRequest(AppError):
    def __init__(self, message: str, details: Optional[Any] = None):
        super().__init__(
            message=message, 
            status_code=400, 
            details=details, 
            error_code='BAD_REQUEST'
        )


class UnprocessableEntity(AppError):
    def __init__(self, details: Optional[Any] = None):
        super().__init__(
            message='Unprocessable Entity', 
            status_code=422, 
            details=details, 
            error_code="UNPROCESSABLE_ENTITY"
        )




class Unauthorized(AppError):
    def __init__(self, message: str, details: Optional[Any] = None):
        super().__init__(
            message=message, 
            status_code=401, 
            details=details, 
            error_code="UNAUTHORIZED"
        )


class ItemNotFound(AppError):
    def __init__(self, message: str, details: Optional[Any] = None):
        super().__init__(
            message=message, 
            status_code=404, 
            details=details, 
            error_code="ITEM_NOT_FOUND"
        )