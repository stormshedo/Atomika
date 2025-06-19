from fastapi import APIRouter, HTTPException
from app.models.lesson import Lesson
from app.schemas.lesson import LessonCreate, LessonResponse
from typing import List
from beanie import PydanticObjectId

lesson_router = APIRouter()

# Creates a lesson
@lesson_router.post("/", response_model=LessonResponse)
async def create_lesson(lesson_data: LessonCreate):
    try:
        print("Received lesson:", lesson_data.model_dump())  # debug print
        lesson = Lesson(**lesson_data.model_dump())
        await lesson.insert()
        return LessonResponse(id=str(lesson.id), **lesson_data.model_dump(), status=lesson.status)
    except Exception as e:
        print("Error during lesson creation:", e)  # prints actual crash
        raise HTTPException(status_code=500, detail=str(e))

# Gets all lessons
@lesson_router.get("/", response_model=List[Lesson])
async def get_lessons():
    lessons = await Lesson.find_all().to_list()
    return lessons

# Gets a lesson by ID
@lesson_router.get("/{lesson_id}", response_model=LessonCreate)
async def get_lesson(lesson_id: PydanticObjectId):
    lesson = await Lesson.get(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

# Updates lesson status (send for review)
@lesson_router.put("/{lesson_id}/status", response_model=LessonCreate)
async def update_lesson_status(lesson_id: PydanticObjectId, new_status: str):
    if new_status not in ["draft", "pending_review", "approved", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    lesson = await Lesson.get(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    lesson.status = new_status
    await lesson.save()
    return lesson

# Deletes lesson
@lesson_router.delete("/{lesson_id}")
async def delete_lesson(lesson_id: PydanticObjectId):
    lesson = await Lesson.get(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    await lesson.delete()
    return {"message": "Lesson deleted successfully"}
