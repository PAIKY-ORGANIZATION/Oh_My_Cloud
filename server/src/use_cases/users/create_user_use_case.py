from entities.user_entity import User
from interfaces.db.repositories.user_repository import UserRepository
from interfaces.hashing.bcrypt_hasher_service import BcryptHasherService
from interfaces.http.exceptions.custom_exception_instances  import BadRequest

from interfaces.schemas.users.create_user_schemas import UserCreateRequest
from dataclasses import dataclass


@dataclass
class CreateUserUseCase():
    user_repository: UserRepository #! Pass the repo and don't let the use case know about the session.
    hasher: BcryptHasherService

    async def execute(self, *, user_data: UserCreateRequest):

        existing_user_with_email = await self.user_repository.find_by_email(user_data.email)

        if existing_user_with_email: raise BadRequest(message="User with this email already exists")
        
        
        hashed_password = await self.hasher.hash_password_async(user_data.password)
        
        user = User(user_data.user_name,  hashed_password,  user_data.email)

        await self.user_repository.save(user)

        return user