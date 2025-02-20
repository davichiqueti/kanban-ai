from sqlmodel import SQLModel, Field, Relationship
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum


class UserBase(SQLModel):
    name: str
    username: str = Field(unique=True)
    email: str = Field(unique=True)
    active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now, sa_column_kwargs={"onupdate": datetime.now})


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    password: str
    board_links: list["BoardUserLink"] = Relationship(back_populates="user")
    name: str
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True)
    active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now, sa_column_kwargs={"onupdate": datetime.now})


class Board(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now, sa_column_kwargs={"onupdate": datetime.now})
    user_links: list["BoardUserLink"] = Relationship(back_populates="board")
    cards: list["BoardCard"] = Relationship(back_populates="board")


class BoardUserRole(str, Enum):
    OWNER = "owner"
    COLLABORATOR = "collaborator"
    VIEWER = "viewer"


class BoardUserLink(SQLModel, table=True):
    role: BoardUserRole
    board_id: Optional[int] = Field(
        default=None, foreign_key="board.id", primary_key=True
    )
    user_id: Optional[int] = Field(
        default=None, foreign_key="user.id", primary_key=True
    )
    board: Board = Relationship(back_populates="user_links")
    user: User = Relationship(back_populates="board_links")


class BoardCardStatus(str, Enum):
    BACKLOG = "backlog"
    TO_DO = "to do"
    DOING = "doing"
    REVIEW  = "review"
    DONE = "done"

class BoardCardPriority(Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3


class BoardCard(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    status: BoardCardStatus = BoardCardStatus.BACKLOG
    priority: Optional[BoardCardPriority]
    created_at: datetime = Field(default_factory=datetime.now)
    due_date: Optional[datetime] = None
    updated_at: datetime = Field(default_factory=datetime.now, sa_column_kwargs={"onupdate": datetime.now})
    board_id: int = Field(default=None, foreign_key="board.id")
    board: Board = Relationship(back_populates="cards")
    responsible_id: Optional[int] = Field(default=None, foreign_key="user.id")


class UserPublic(UserBase):
    id: int


class UserCreate(BaseModel):
    name: str
    username: str
    email: str
    password: str
