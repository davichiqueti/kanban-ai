from fastapi import APIRouter, Depends
from database import get_session
from models.user import User
from sqlmodel import Session, select


router = APIRouter()


@router.get("/users", response_model=list[User])
async def get_users(*, session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()
    return users
