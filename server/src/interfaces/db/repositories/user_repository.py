from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from entities.user_entity import User


class UserRepository():
    def __init__(self, session: AsyncSession):
        self.session = session
    

    async def find_by_email(self, email:str):
        existing_email_user_result = await self.session.execute(
            select(User).where(User.email == email).options(selectinload(User.files))  #! Eager load the files relationship.
        )

        existing: User | None = existing_email_user_result.scalars().first()
        return existing

    async def find_by_id(self, id: str):
        existing_email_user_result = await self.session.execute(
            select(User).where(User.id == id).options(selectinload(User.files)) #! Eager load the files relationship.
        )

        existing: User | None = existing_email_user_result.scalars().first()
        return existing

    async def save(self, user: User):
        self.session.add(user)
        await self.session.commit()

    async def delete(self, user: User):
        await self.session.delete(user)
        await self.session.commit()
