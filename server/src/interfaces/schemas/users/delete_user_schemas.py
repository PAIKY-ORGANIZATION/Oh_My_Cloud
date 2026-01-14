from pydantic import BaseModel, ConfigDict

class DeleteUserRequest(BaseModel):

    model_config = ConfigDict(extra="forbid")

    password: str