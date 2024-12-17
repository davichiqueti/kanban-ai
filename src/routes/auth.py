from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select
from database import get_session
from models.user import User, UserCreate, UserPublic
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from typing import Annotated
from datetime import datetime, timedelta
from jose import jwt, JWTError


router = APIRouter()

class Token(BaseModel):
    acess_token: str
    token_type: str


@router.post("/auth/signup", response_model=UserPublic)
async def create_user(user_form: UserCreate, session: Session = Depends(get_session)):
    user_form.password = crypt_context.hash(user_form.password)
    user = User.model_validate(user_form)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.post("/auth/token", response_model=Token)
async def login_for_acess_token(form: Annotated[OAuth2PasswordRequestForm, Depends()], session: Session = Depends(get_session)):
    user = authenticate_user(form.username, form.password, session)
    if not user:
        raise HTTPException(status_code=401)
    token = create_acess_token(user.username, user.password)
    return {"acess_token": token, "token_type": "bearer"}
