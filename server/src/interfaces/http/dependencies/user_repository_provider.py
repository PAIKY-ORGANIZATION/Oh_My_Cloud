

from sqlalchemy.ext.asyncio import AsyncSession
from interfaces.db.repositories.user_repository import UserRepository
from fastapi import Depends
from interfaces.http.dependencies.db_session_provider import get_db_session_provider


def get_user_repository_provider(session: AsyncSession =  Depends(get_db_session_provider)):
    return UserRepository(session)