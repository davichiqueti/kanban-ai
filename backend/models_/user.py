from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime


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
    board_links: list["BoardUserLink"] = Relationship(back_populates="user") # type: ignore
    name: str
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True)
    active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now, sa_column_kwargs={"onupdate": datetime.now})