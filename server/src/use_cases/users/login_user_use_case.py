from interfaces.db.repositories.user_repository import UserRepository
from interfaces.hashing.bcrypt_hasher_service import BcryptHasherService
from interfaces.http.exceptions.custom_exception_instances import Unauthorized
from interfaces.jwt_interface.jwt_service import JWTService

from interfaces.schemas.users.login_user_schema import UserLoginRequest
from dataclasses import dataclass

@dataclass
class LoginUserUseCase():
    user_repository: UserRepository
    hasher: BcryptHasherService
    jwt_provider: JWTService

    async def execute(self, *, user_data: UserLoginRequest):
        existing_user_with_email = await self.user_repository.find_by_email(user_data['email'])

        if not existing_user_with_email: raise Unauthorized(message='Invalid email or password')

        password_match = await self.hasher.verify_password_async(
            unhashed_password=user_data['password'],
            hashed_password=existing_user_with_email.password
        )

        if not password_match: raise Unauthorized(message='Invalid email or password')
        
        token = self.jwt_provider.generate_jwt(user_id=existing_user_with_email.id)

        return token, existing_user_with_email
        