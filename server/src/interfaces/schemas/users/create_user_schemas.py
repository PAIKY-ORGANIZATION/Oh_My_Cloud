from typing import TypedDict
from pydantic  import  BaseModel, EmailStr, Field, ConfigDict


class UserCreateRequest(BaseModel):
    
    model_config = ConfigDict(extra="forbid")

    user_name: str = Field(min_length=3, max_length=20)
    password: str = Field(min_length=8, max_length=12152024)
    email: EmailStr




class UserOut(TypedDict):
    id: str
    user_name: str
    email: str
