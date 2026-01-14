from typing import Any, NotRequired, Optional, TypedDict


class StandardResponse(TypedDict):
    success: bool
    message: str
    details: NotRequired[Any]
    data:  Optional[Any]
