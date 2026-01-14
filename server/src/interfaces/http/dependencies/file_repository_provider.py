

from sqlalchemy.ext.asyncio import AsyncSession
from interfaces.db.repositories.file_repository import FileRepository
from fastapi import Depends
from interfaces.http.dependencies.db_session_provider import get_db_session_provider


def get_file_repository_provider(session: AsyncSession = Depends(get_db_session_provider)):
    return FileRepository(session)
