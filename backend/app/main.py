from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.lesson import lesson_router
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.lesson import Lesson
import os

app = FastAPI(
    title="Atomika Educational Platform",
    version="1.0.0"
)

# CORS setup
origins = [
    "http://localhost:5173",                      # Vite frontend dev server
    "http://127.0.0.1:5173",                      # Alternative localhost
    "https://9d55-84-54-66-159.ngrok-free.app",   # Previous ngrok backend
    "https://4abf-94-230-231-228.ngrok-free.app"  # Current ngrok backend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Beanie MongoDB init using environment variables
@app.on_event("startup")
async def start_db():
    mongodb_url = os.getenv("MONGODB_URL")
    db_name = os.getenv("DATABASE_NAME", "atomika_db")
    client = AsyncIOMotorClient(mongodb_url)
    await init_beanie(database=client[db_name], document_models=[Lesson])

# API Routes
app.include_router(lesson_router, prefix="/lessons", tags=["Lessons"])

@app.get("/")
def root():
    return {"message": "Welcome to Atomika Backend!"}
