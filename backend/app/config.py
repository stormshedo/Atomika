import os
from dotenv import load_dotenv

load_dotenv()  # Load from .env file

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "atomika_db")
