from interfaces.db.engine import SyncEngine

from interfaces.db.declarative_base import Base

#* These need to be imported so that they take the Base.
from entities.file_entity import File
from entities.user_entity import User
from entities.shareable_file_access_entity import ShareableFileAccess



def emit_base ():
    Base.metadata.create_all(bind=SyncEngine)
    print("Base emitted")