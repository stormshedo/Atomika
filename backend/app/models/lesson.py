from typing import List, Optional, Literal
from beanie import Document
from pydantic import BaseModel, Field

class LessonObject(BaseModel):
    text: Optional[str] = None
    video_url: Optional[str] = None
    order: Optional[int] = None

class Lesson(Document):
    subject: str
    module: str
    unit: str
    title: str
    language: Literal["uz", "ru"]
    status: Literal["draft", "pending_review", "approved", "rejected"] = "draft"
    objects: List[LessonObject] = Field(default_factory=list)

    class Settings:
        name = "lessons"
