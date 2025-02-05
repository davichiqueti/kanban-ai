from fastapi import Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import User
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from typing import Annotated
from datetime import datetime, timedelta
from jose import jwt, JWTError
import os


JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
JWT_ALGORITHM = os.environ["JWT_ALGORITHM"]
crypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def authenticate_user(username: str, password: str, session: Session):
    user = session.exec(select(User).filter(User.username == username)).first()
    if (not user):
        return None
    if (not crypt_context.verify(password, user.password)):
        return None
    return user


def create_access_token(username: str, user_id: int):
    expire_time = datetime.now() + timedelta(days=14)
    jwt_payload = {"sub": username, "id": user_id, "exp": expire_time}
    print(jwt_payload)
    return jwt.encode(jwt_payload, JWT_SECRET_KEY, JWT_ALGORITHM)


def get_current_user(
    token: Annotated[str, Depends(oauth_scheme)], 
    session: Session = Depends(get_session)
) -> User:
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
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
