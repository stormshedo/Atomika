from pydantic import BaseSettings

class Settings(BaseSettings):
    MONGODB_URI: str = "mongodb://localhost:27017/atomika"

settings = Settings()
