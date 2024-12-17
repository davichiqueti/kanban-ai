from fastapi import FastAPI
from database import create_db_and_tables
from routes.auth import router as auth_router
from routes.users import router as users_router
from routes.boards import router as boards_router


app = FastAPI(root_path="/api")
app.add_event_handler("startup", create_db_and_tables)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(boards_router)
