from pydantic import BaseModel
from typing import List

class LessonObjectSchema(BaseModel):
    type: str
    content: str

class LessonCreateSchema(BaseModel):
    title: str
    language: str
    module: str
    unit: str
    objects: List[LessonObjectSchema]
