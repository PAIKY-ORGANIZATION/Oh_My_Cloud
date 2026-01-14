from sqlalchemy.ext.asyncio import AsyncSession
from entities.file_entity import File
from sqlalchemy import select


class FileRepository():
    
    def __init__(self, session: AsyncSession):
        self.session = session
    
    
    async def save(self, file: File):
        self.session.add(file)
        await self.session.commit()
    
        
    async def find_by_id(self, file_id: str):
        file_result = await self.session.execute(
            select(File).where(File.id == file_id)
        )
        return file_result.scalars().one()
    
    async def delete(self, file: File):
        await self.session.delete(file)
        await self.session.commit()