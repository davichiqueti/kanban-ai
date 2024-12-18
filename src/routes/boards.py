from fastapi import APIRouter, Depends, HTTPException
from models_ import Board, BoardUserLink, BoardUserRole, BoardCardPriority, BoardCardStatus, User
from database import get_session
from sqlmodel import Session, select
from utils.jwt_authentication import get_current_user
from typing import Optional
from pydantic import BaseModel
from datetime import datetime


router = APIRouter()


class BoardCreate(BaseModel):
    name: str
    description: Optional[str]


class BoardCardCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: BoardCardStatus = BoardCardStatus.BACKLOG
    priority: Optional[BoardCardPriority]
    created_at: datetime = Field(default_factory=datetime.now)
    due_date: Optional[datetime] = None
    updated_at: datetime = Field(default_factory=datetime.now, sa_column_kwargs={"onupdate": datetime.now})
    board_id: int = Field(default=None, foreign_key="board.id")
    board: Board = Relationship(back_populates="cards")
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")()

class BoardResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    created_at: datetime
    user_links: list
    cards: list


@router.get("/boards", response_model=list[BoardResponse])
async def get_user_boards(session: Session = Depends(get_session), user=Depends(get_current_user)):
    boards = session.exec(
        select(Board)
        .join(BoardUserLink)
        .filter(BoardUserLink.user_id == user.id)
    ).all()
    return boards


@router.post("/boards", response_model=BoardResponse)
async def create_board(board: BoardCreate, session: Session = Depends(get_session), user=Depends(get_current_user)):
    new_board = Board.model_validate(board)
    session.add(new_board)
    session.commit(new_board)
    session.refresh(new_board)
    board_user_link = BoardUserLink(
        board_id=new_board.id,
        user_id=user.id,
        role="owner"
    )
    session.add(board_user_link)
    session.commit()
    return new_board


@router.post("/boards/{board_id}/cards", response_model=BoardResponse)
async def add_board_member(board_id: int, card: session: Session = Depends(get_session), current_user=Depends(get_current_user)):
    board = session.exec(
        select(Board)
        .join(BoardUserLink)
        .filter(
            Board.id == board_id,
            BoardUserLink.user_id == current_user.id
        )
    ).first()
    if (not board):
        raise HTTPException(status_code=404, detail="Board not found")
    board_user_link = BoardUserLink(
        board_id=board.id,
        user_id=user.id,
        role=BoardUserRole.COLLABORATOR
    )
    session.add(board_user_link)
    session.commit()
    return board


@router.put("/boards/{board_id}/user/{username}", response_model=BoardResponse)
async def add_board_member(
    board_id: int,
    username: str,
    session: Session = Depends(get_session),
    current_user=Depends(get_current_user)
):
    board = session.exec(
        select(Board)
        .join(BoardUserLink)
        .filter(
            Board.id == board_id,
            BoardUserLink.user_id == current_user.id,
            BoardUserLink.role == BoardUserRole.OWNER
        )
    ).first()
    user = session.exec(select(User).filter(User.username == username)).first()
    if (not board or not user):
        raise HTTPException(status_code=404, detail="Board or User not found")
    board_user_link = BoardUserLink(
        board_id=board.id,
        user_id=user.id,
        role=BoardUserRole.COLLABORATOR
    )
    session.add(board_user_link)
    session.commit()
    return board
