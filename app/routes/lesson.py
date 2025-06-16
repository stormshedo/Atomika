from fastapi import APIRouter
from app.models.lesson import Lesson
from app.schemas.lesson import LessonCreateSchema

router = APIRouter()

@router.post("/")
async def create_lesson(data: LessonCreateSchema):
    lesson = Lesson(**data.dict())
    await lesson.insert()
    return lesson
