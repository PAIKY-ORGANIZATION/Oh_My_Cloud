from sqlalchemy.orm import Mapped, mapped_column
from interfaces.db.declarative_base import Base
from sqlalchemy import ForeignKey, Integer, String



class File(Base):

    __tablename__ = "files"
    id: Mapped[str] = mapped_column(String, primary_key=True) #$ This Id get added manually on upload_file_controller with the file_processing_uuid.
    # uuid_file_name: Mapped[str] = mapped_column(String, nullable=False, unique=True) #$ This is what will make file names unique while processing.
    original_file_name: Mapped[str] = mapped_column(String, nullable=False)
    safe_file_name: Mapped[str] = mapped_column(String, nullable=False)
    original_file_size: Mapped[int] = mapped_column(Integer, nullable=False)
    integrity_hash: Mapped[str] = mapped_column(String, nullable=False)
    
    owner_id: Mapped[str] = mapped_column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    # owner: Mapped[User] = relationship(init=False, back_populates="files") #! This SQLAlchemy-level relationship is not needed for now. Even deleting a user will cascade delete their files.

    #? Implement some kind of "state" field. Example: "pending", "processing", "failed"

    def to_dto(self): #! #! This is more of a "to_dict" because when sending a response, fastapi fails to convert "User" to JSON without a Pydantic model.
        return {
            "id": self.id,
            "original_file_name": self.original_file_name,
            "original_file_size": self.original_file_size,
        }