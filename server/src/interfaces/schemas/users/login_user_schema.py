
from typing import TypedDict

from pydantic import TypeAdapter

#! I didn't use the Pydantic BaseModel here because .model_dump() gives  the type "[str, Any]".
#$ FastAPI can validate the body using this TypedDict.
#! However, I defaulted to using the BaseModel in the rest of the project for more validation features. This would just be a demonstration.
class UserLoginRequest(TypedDict):
    email: str
    password: str


login_user_validator = TypeAdapter(UserLoginRequest) #$ This can act as a Pydantic validator.
#$ Since FastAPI already validates the body with the TypedDict, this is extra in case of, for example, have Redis/RabbitMQ and want to validate it into that same TypedDict.