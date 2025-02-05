from sqlmodel import Session, SQLModel, create_engine
import os


engine = create_engine(os.environ["DATABASE_URL"])


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
