from fastapi import APIRouter, Depends
from models_ import User, UserPublic
from sqlmodel import select
from utils.jwt_authentication import get_current_user


router = APIRouter()


@router.get("/users/me", response_model=UserPublic)
async def get_user(user = Depends(get_current_user)):
    return user
