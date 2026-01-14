from sqlalchemy.ext.asyncio import async_sessionmaker
from interfaces.db.engine import AsyncEngine


AsyncSessionMaker = async_sessionmaker(
    bind=AsyncEngine,
    expire_on_commit=False #$ This will ensure that, after committing an ORM object, it will not be expired. I you tried to print it after expiration, it will raise an error because it would try to query the object from the database on a synchronous way.
)