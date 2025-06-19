from fastapi import FastAPI
from app.routes.lesson import lesson_router
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.lesson import Lesson

app = FastAPI(
    title="Atomika Educational Platform",
    version="1.0.0"
)

# Beanie MongoDB init
@app.on_event("startup")
async def start_db():
    client = AsyncIOMotorClient("mongodb://mongo:27017")  # use Docker service name!
    await init_beanie(database=client.atomika_db, document_models=[Lesson])

# Routes
app.include_router(lesson_router, prefix="/lessons", tags=["Lessons"])

@app.get("/")
def root():
    return {"message": "Welcome to Atomika Backend!"}
