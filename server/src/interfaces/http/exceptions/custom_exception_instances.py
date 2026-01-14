from typing import Any, Optional


class AppError(Exception):
    def __init__(self, *, message: str, status_code: int, details: Optional[Any] = None):
        self.message = message
        self.status_code = status_code
        self.details = details
        super().__init__(message)


class BadRequest(AppError):
    def __init__(self, message: str, details: Optional[Any] = None):
        super().__init__(message=message, status_code=400, details=details)


class UnprocessableEntity(AppError):
    def __init__(self, details: Optional[Any] = None):
        super().__init__(message='Unprocessable Entity', status_code=422, details=details)


class Unauthorized(AppError):
    def __init__(self, message: str, details: Optional[Any] = None):
        super().__init__(message=message, status_code=401, details=details)

class SeverError(AppError):
    def __init__(self, details: Optional[Any] = None, message: Optional[str] = None):
        super().__init__(message=message or 'An unexpected error occurred', status_code=500, details=details)


class ItemNotFound(AppError):
    def __init__(self, message: str):
        super().__init__(message=message, status_code=404)