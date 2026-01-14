from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from entities.shareable_file_access_entity import ShareableFileAccess


class ShareableFileAccessRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def save(self, shareable_file_access: ShareableFileAccess): #$ Create or update.
        self.session.add(shareable_file_access)
        await self.session.commit()
    
    async def find_by_id(self, id: str):
        result = await self.session.execute(
            select(ShareableFileAccess).where(ShareableFileAccess.id == id)
        )

        shareable_file_access = result.scalars().first()

        return shareable_file_access