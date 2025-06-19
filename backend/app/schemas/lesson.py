from typing import List, Optional
from pydantic import BaseModel

class LessonObject(BaseModel):
    text: Optional[str] = None
    video_url: Optional[str] = None
    order: Optional[int] = None

class LessonCreate(BaseModel):
    subject: str
    module: str
    unit: str
    title: str
    language: str
    objects: List[LessonObject]

class LessonResponse(LessonCreate):
    id: str
    status: str
