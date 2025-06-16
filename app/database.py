from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from app.models.lesson import Lesson
from app.config import settings

async def init_db():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    await init_beanie(database=client.get_default_database(), document_models=[Lesson])
