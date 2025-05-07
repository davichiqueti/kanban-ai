from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from models import Board, BoardCard, BoardUserLink, BoardUserRole, User
from database import get_session
from sqlmodel import Session, select
from utils.jwt_authentication import get_current_user
from utils.report_generator import generate_board_email_report
from typing import Optional
from pydantic import BaseModel
from datetime import datetime


router = APIRouter()


@router.post("/boards/{board_id}/report", response_model=str)
async def create_board_report(
    board_id: int,
    background_tasks: BackgroundTasks,
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
    # Adiciona a tarefa de enviar o e-mail em segundo plano
    background_tasks.add_task(generate_board_email_report, current_user.email, "Board Report")
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    report = generate_board_report(board)
    return report
