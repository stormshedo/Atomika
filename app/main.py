from fastapi import FastAPI
from app.routes import lesson
from app.database import init_db

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await init_db()

app.include_router(lesson.router, prefix="/lessons", tags=["Lessons"])
