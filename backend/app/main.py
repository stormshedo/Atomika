from fastapi import FastAPI
from app.routes.lesson import lesson_router
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.lesson import Lesson

app = FastAPI(
    title="Atomika Educational Platform",
    version="1.0.0"
)

# CORS setup
origins = [
    "http://localhost:5173",              # Vite frontend dev server
    "http://127.0.0.1:5173",              # Alternative localhost
    "https://9d55-84-54-66-159.ngrok-free.app"  # Your current ngrok backend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
