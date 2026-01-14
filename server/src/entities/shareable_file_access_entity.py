



from datetime import datetime
from typing import Optional
from interfaces.db.declarative_base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Boolean, DateTime, String, ForeignKey
from uuid import uuid4



class ShareableFileAccess(Base):

    __tablename__ = "shareable_file_access"

    id: Mapped[str] = mapped_column(String, primary_key=True, default_factory=lambda: str(uuid4()), init=False) #$ "default_factory" is created at __init__ time while "default" is created when flushing/committing.
    # token: Mapped[str] = mapped_column(String, default_factory=lambda: uuid4(), init=False) #$ The unguessable (random) token will be the id.
    password: Mapped[str | None] = mapped_column(String, nullable=True)    
    file_id: Mapped[str] = mapped_column(ForeignKey("files.id", ondelete="CASCADE"), nullable=False)
    expires_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True) #$ `timezone=True` will allow that "UTC" is stored in the datetime binary. UTC will come from Python code.
    expires_when_opened: Mapped[bool] = mapped_column(Boolean, default=False) #$ If true, when the link is opened the use_case will make `expires_at` to current datetime.