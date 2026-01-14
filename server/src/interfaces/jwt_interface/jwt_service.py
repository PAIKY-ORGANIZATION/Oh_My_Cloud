from datetime import datetime, timedelta, timezone
import os
from typing import TypedDict, cast
import jwt

from interfaces.http.exceptions.custom_exception_instances import Unauthorized 




class JWTPayload(TypedDict):
    user_id: str
    exp: datetime

secret = cast(str, os.environ.get("JWT_SECRET"))


class JWTService:

    def generate_jwt(self, user_id: str) -> str:
        
        payload: JWTPayload = {
            "user_id": user_id,
            "exp": datetime.now(timezone.utc) + timedelta(days=1), #$ Expires in 1 day
        }

        token: str = jwt.encode(payload=payload, key=secret, algorithm="HS256") # type: ignore
        return token
    
    def verify_jwt(self, token: str) -> JWTPayload:


        try:
            payload: JWTPayload = jwt.decode(token, secret, algorithms=["HS256"]) # type: ignore
            
            return payload
            
        except jwt.InvalidTokenError:
            raise Unauthorized(message='Invalid token')