from typing import Any, NotRequired, Optional, TypedDict



#! Don't use "response.data" or "response.details" or "response.success"
#! Using "response.success" is redundant when status codes exist
#! Also no need for "response.message", it just adds noise.
#$  Instead, on your endpoints just return the data and status code directly.

#$ However, do add more details on errors and wrap everything in a standard "error{}"

# class StandardResponse(TypedDict):
#     success: bool
#     message: str
#     details: NotRequired[Any]
#     data:  Optional[Any]