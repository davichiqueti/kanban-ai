from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session
from database import get_session
from models_ import User, UserCreate, UserPublic
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from utils.jwt_authentication import crypt_context, authenticate_user, create_access_token


router = APIRouter()


class Token(BaseModel):
    access_token: str
    token_type: str


@router.post("/auth/signup", response_model=UserPublic)
async def create_user(user_form: UserCreate, session: Session = Depends(get_session)):
    user_form.password = crypt_context.hash(user_form.password)
    user = User.model_validate(user_form)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.post("/auth/login", response_model=Token)
async def login_for_access_token(form: Annotated[OAuth2PasswordRequestForm, Depends()], session: Session = Depends(get_session)):
    user = authenticate_user(form.username, form.password, session)
    if not user:
        raise HTTPException(status_code=401)
    token = create_access_token(user.username, user.id)
    return {"access_token": token, "token_type": "bearer"}
