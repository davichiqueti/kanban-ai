from fastapi import APIRouter, Depends, HTTPException
from models import Board, BoardCard, BoardUserLink, BoardUserRole, BoardCardPriority, BoardCardStatus, User
from database import get_session
from sqlmodel import Session, select
from utils.jwt_authentication import get_current_user
from utils.report_generator import generate_board_report
from typing import Optional
from pydantic import BaseModel
from datetime import datetime


router = APIRouter()


class BoardCreate(BaseModel):
    name: str
    description: Optional[str]


class BoardUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class BoardCardCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: BoardCardStatus = BoardCardStatus.BACKLOG
    priority: Optional[BoardCardPriority] = None
    due_date: Optional[datetime] = None


class BoardCardUpdate(BoardCardCreate):
    title: Optional[str] = None
    status: Optional[BoardCardStatus] = None


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


@router.get("/boards/{board_id}", response_model=BoardResponse)
async def get_user_board(board_id: int, session: Session = Depends(get_session), user=Depends(get_current_user)):
    board = session.exec(
        select(Board)
        .join(BoardUserLink)
        .filter(Board.id == board_id, BoardUserLink.user_id == user.id)
    ).first()
    return board


@router.post("/boards", response_model=BoardResponse)
async def create_board(board: BoardCreate, session: Session = Depends(get_session), user=Depends(get_current_user)):
    new_board = Board.model_validate(board)
    session.add(new_board)
    session.commit()
    session.refresh(new_board)
    board_user_link = BoardUserLink(
        board_id=new_board.id,
        user_id=user.id,
        role="owner"
    )
    session.add(board_user_link)
    session.commit()
    return new_board


@router.put("/boards/{board_id}", response_model=BoardResponse)
async def update_board(
    board_id: int,
    board_update: BoardUpdate,
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
    if (not board):
        raise HTTPException(status_code=404, detail="Board not found or you do not have permission to update it")
    if (board_update.name):
        board.name = board_update.name
    if (board_update.description):
        board.description = board_update.description
    session.add(board)
    session.commit()
    session.refresh(board)
    return board


@router.post("/boards/{board_id}/cards", response_model=BoardResponse)
async def add_board_card(
    board_id: int,
    card: BoardCardCreate,
    session: Session = Depends(get_session),
    current_user=Depends(get_current_user)
):
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
    # Creating card
    new_card = BoardCard(
        title=card.title,
        description=card.description,
        status=card.status,
        priority=card.priority,
        due_date=card.due_date,
        board_id=board.id
    )
    session.add(new_card)
    session.commit()
    session.refresh(board)
    return board


@router.delete("/boards/{board_id}/cards/{card_id}", response_model=BoardResponse)
async def delete_board_card(
    board_id: int,
    card_id: int,
    session: Session = Depends(get_session),
    current_user=Depends(get_current_user)
):
    card = session.exec(
        select(BoardCard)
        .join(Board)
        .join(BoardUserLink)
        .filter(
            Board.id == board_id,
            BoardCard.id == card_id,
            BoardUserLink.board_id == board_id,
            BoardUserLink.user_id == current_user.id
        )
    ).first()
    if (not card):
        raise HTTPException(status_code=404, detail="Board Card not found")
    card_board = card.board
    session.delete(card)
    session.commit()
    session.refresh(card_board)
    return card_board


@router.put("/boards/{board_id}/cards/{card_id}", response_model=BoardResponse)
async def update_board_card(
    board_id: int,
    card_id: int,
    card_update: BoardCardUpdate,
    session: Session = Depends(get_session),
    current_user=Depends(get_current_user)
):
    card = session.exec(
        select(BoardCard)
        .join(Board)
        .join(BoardUserLink)
        .filter(
            Board.id == board_id,
            BoardCard.id == card_id,
            BoardUserLink.board_id == board_id,
            BoardUserLink.user_id == current_user.id
        )
    ).first()
    if (not card_update):
        raise HTTPException(status_code=404, detail="Board Card not found or you do not have permission to update it")
    for attr, value in card_update.model_dump().items():
        if value is not None:
            setattr(card, attr, value)
    # Updating card in database and refreshing board
    session.add(card)
    session.commit()
    session.refresh(card.board)
    return card.board


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


@router.get("/boards/{board_id}/report", response_model=str)
async def get_board_report(
    board_id: int,
    session: Session = Depends(get_session),
    current_user=Depends(get_current_user)
):
    board = session.exec(
        select(Board)
        .filter(
            Board.id == board_id,
            BoardUserLink.user_id == current_user.id,
            BoardUserLink.role == BoardUserRole.OWNER
        )
    ).first()
    print(board)
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    report = generate_board_report(board)
    return report
