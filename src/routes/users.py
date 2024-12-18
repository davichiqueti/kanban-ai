from fastapi import APIRouter, Depends
from models_ import User, UserPublic
from sqlmodel import select, Session
from utils.jwt_authentication import get_current_user
from database import get_session


router = APIRouter()


@router.get("/users/me", response_model=UserPublic)
async def get_user(user=Depends(get_current_user)):
    return user


@router.get("/users/{username}", response_model=UserPublic)
async def get_user(username: str, session: Session = Depends(get_session), _=Depends(get_current_user)):
    user = session.exec(select(User).filter(User.username == username)).first()
    return user
