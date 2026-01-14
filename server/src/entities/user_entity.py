from typing import TYPE_CHECKING
import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String

from interfaces.db.declarative_base import Base
from interfaces.schemas.users.create_user_schemas import UserOut



#* This will allow to get Type hints for the relationship without having to import the File entity here which would cause a circular import since the File entity should also import the User entity.
if TYPE_CHECKING:
    from entities.file_entity import File 


class User(Base):

    __tablename__ = "users"


    ENTITY_STORAGE_LIMIT_BYTES = 100 * 1024 * 1024 # 100 MB

    id: Mapped[str] = mapped_column( primary_key=True,  init=False,  default_factory=lambda: str(uuid.uuid4())) #$ `default_factory` is created at __init__ time while `default` is created when flushing/committing.
    user_name: Mapped[str] = mapped_column(String, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    consumed_storage_bytes: Mapped[int] = mapped_column(Integer, nullable=False, default=0)    


    files: Mapped[list["File"]] = relationship(
        init=False, 
        # lazy="selectin", #! By default `user.files` uses lazy loading (which would cause an error since it's synchronous) so we use `selectin` to make it eager loading. You could also use a separate query to get the files.    YOu can also make your query with a "selectinload" option for more explicitness.
        
        cascade="all, delete-orphan" #! This is an SQLAlchemy-level cascade relationship. It allows deleting users+files with `session.delete(user); session.commit(); while keeping `nullable=False` for files.
    )
    

    def to_dto(self) -> UserOut: #! This is more of a "to_dict" because when sending a response, fastapi fails to convert "User" to JSON without a Pydantic model.
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email
        }
    #? Could implement a "to_user_summary_dto", it's seems like a common pattern