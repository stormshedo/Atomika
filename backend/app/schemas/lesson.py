from typing import List, Optional, Literal
from pydantic import BaseModel

class LessonObject(BaseModel):
    order: int
    text: str
    video_url: Optional[str] = None
    image: Optional[str] = None
    feedback: Optional[str] = None

class LanguageContent(BaseModel):
    title: str
    objects: List[LessonObject]

class LessonCreate(BaseModel):
    subject: str
    module: str
    unit: str
    duration: str
    order: int
    video_url: Optional[str] = None
    status: Optional[str] = None  # optional, not "draft" by default
    ru: LanguageContent
    uz: LanguageContent

class LessonResponse(LessonCreate):
    id: str

class FeedbackModerationRequest(BaseModel):
    action: Literal["approve", "reject"]
    ru_feedbacks: Optional[List[Optional[str]]] = None
    uz_feedbacks: Optional[List[Optional[str]]] = None
