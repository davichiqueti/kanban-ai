from sqlmodel import SQLModel, Field, Relationship
from models.user import User
from typing import Optional
from datetime import datetime
from enum import Enum


class BoardCollaboratorRole(str, Enum):
    owner = 'owner'
    editor = 'editor'
    viewer = 'viewer'


class BoardCollaborators(SQLModel, table=True):
    role: BoardCollaboratorRole
    board_id: Optional[int] = Field(
        foreign_key="board.id", primary_key=True
    )
    user_id: Optional[int] = Field(
        foreign_key="user.id", primary_key=True
    )


class Board(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    name: str
    description: Optional[str]
    owner_id: Optional[User] = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now, sa_column_kwargs={"onupdate": datetime.now})
    collaborators: list[User] = Relationship(
        back_populates="boards",
        link_model=BoardCollaborators
    )
