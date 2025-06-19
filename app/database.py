from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.config import MONGODB_URL, DATABASE_NAME
from app.models.lesson import Lesson

class Database:
    client: AsyncIOMotorClient = None
    database = None

database = Database()

async def connect_to_mongo():
    """Create database connection"""
    database.client = AsyncIOMotorClient(MONGODB_URL)
    database.database = database.client[DATABASE_NAME]
    await init_beanie(database=database.database, document_models=[Lesson])

async def close_mongo_connection():
    """Close database connection"""
    if database.client:
        database.client.close()

async def ping_database():
    """Test database connection"""
    try:
        await database.client.admin.command('ping')
        return True
    except Exception as e:
        print(f"Database connection failed: {e}")
        return False
