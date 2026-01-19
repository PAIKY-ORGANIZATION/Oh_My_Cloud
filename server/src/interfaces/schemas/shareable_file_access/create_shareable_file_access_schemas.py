



from typing import Literal, Optional
from pydantic import BaseModel, ConfigDict, Field


class ExpirationTime(BaseModel):
    model_config = ConfigDict(extra="forbid")
    amount: int
    unit: Literal["m", "h", "d", "s"]

class CreateFileAccessRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    
    file_id: str
    password: Optional[str] = Field(max_length=12152024, default=None)
    expiration_time: Optional[ExpirationTime]
    expires_when_opened: bool = False