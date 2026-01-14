from sqlalchemy.ext.asyncio import AsyncSession

from interfaces.db.repositories.shareable_file_access_repository import ShareableFileAccessRepository
from fastapi import Depends
from interfaces.http.dependencies.db_session_provider import get_db_session_provider

def get_shareable_file_access_repository_provider(session: AsyncSession = Depends(get_db_session_provider)) -> ShareableFileAccessRepository:
    return ShareableFileAccessRepository(session)