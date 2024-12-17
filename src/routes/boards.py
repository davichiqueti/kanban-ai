from fastapi import APIRouter, Depends, HTTPException
from models_ import Board, BoardUserLink, BoardUserRole, User
from database import get_session
from sqlmodel import Session, select
from utils.jwt_authentication import get_current_user
from typing import Optional
from pydantic import BaseModel


router = APIRouter()


class BoardCreate(BaseModel):
    name: str
    description: Optional[str]


class BoardResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]


@router.get("/boards")
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


@router.put("/boards/{board_id}/heroes/{user_id}", response_model=BoardResponse)
async def add_board_member(
    board_id: int,
    user_id: int,
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
    user = session.get(User, user_id)
    if not board or not user:
        raise HTTPException(status_code=404, detail="Board or User not found")
    board_user_link = BoardUserLink(
        board_id=board.id,
        user_id=user.id,
        role=BoardUserRole.COLLABORATOR
    )
    session.add(board_user_link)
    session.commit()
    return board
