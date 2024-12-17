from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select
from database import get_session
from models.user import User
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from typing import Annotated
from datetime import datetime, timedelta
from jose import jwt, JWTError

 # TODO: replace for environment variable
SECRET_KEY = "7507d63c4d554b2130d9d27468202a4060978ff7d3588323a6c15b2b58afa9fe"
ALGORITHM = "HS256"

crypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth_scheme = OAuth2PasswordBearer(tokenUrl="token")


def authenticate_user(username: str, password: str, session: Session):
    user = session.exec(select(User).filter(User.username == username)).first()
    if (not user):
        return None
    if (not crypt_context.verify(password, user.password)):
        return None
    return user


def create_acess_token(username: str, user_id: int):
    expire_time = datetime.now() + timedelta(days=14)
    jwt_base = {"sub": username, "id": user_id, "exp": expire_time}
    return jwt.encode(jwt_base, SECRET_KEY, ALGORITHM)


def get_current_user(
    token: Annotated[str, Depends(oauth_scheme)], 
    session: Session = Depends(get_session)
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        if username is None or user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = session.exec(select(User).filter(User.id == user_id and User.active)).first()
    if user is None:
        raise credentials_exception
    return user
