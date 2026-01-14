import os
from typing import cast
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine

DATABASE_URL_PARTIAL = cast(str,os.environ.get('DATABASE_URL_PARTIAL'))


ASYNC_CONNECTION_STRING = f"postgresql+asyncpg{DATABASE_URL_PARTIAL}"
SYNC_CONNECTION_STRING = f"postgresql{DATABASE_URL_PARTIAL}"


AsyncEngine = create_async_engine(ASYNC_CONNECTION_STRING)

#$ For `emit_base()`
SyncEngine = create_engine(SYNC_CONNECTION_STRING)






