from beanie import Document
from pydantic import BaseModel
from typing import List

class LessonObject(BaseModel):
    type: str  # text, video, file
    content: str

class Lesson(Document):
    title: str
    language: str
    module: str
    unit: str
    status: str = "draft"
    objects: List[LessonObject]
