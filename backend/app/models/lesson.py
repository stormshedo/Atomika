from typing import List, Optional, Literal
from beanie import Document
from pydantic import BaseModel, Field

# Object model for each content block in a language
class LessonObject(BaseModel):
    order: int
    text: str
    video_url: Optional[str] = None
    image: Optional[str] = None

# Language block (RU or UZ)
class LanguageContent(BaseModel):
    title: str
    objects: List[LessonObject]

# Main Lesson document
class Lesson(Document):
    subject: str
    module: str
    unit: str
    duration: str
    order: int
    video_url: Optional[str] = None  # shared main video
    status: Optional[Literal["draft", "pending_review", "approved", "rejected"]] = None  # no default value!

    # Language-specific content
    ru: LanguageContent
    uz: LanguageContent

    class Settings:
        name = "lessons"
