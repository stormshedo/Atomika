from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.models.lesson import Lesson
from app.schemas.lesson import LessonCreate, LessonResponse, FeedbackModerationRequest
from typing import List
from beanie import PydanticObjectId

lesson_router = APIRouter()

# ✅ Create a lesson
@lesson_router.post("/", response_model=LessonResponse)
async def create_lesson(lesson_data: LessonCreate):
    try:
        print("Received lesson:", lesson_data.model_dump())  # 👈 add debug print
        lesson = Lesson(**lesson_data.model_dump())
        await lesson.insert()
        return LessonResponse(id=str(lesson.id), **lesson_data.model_dump(exclude={"status"}), status=lesson.status)
    except Exception as e:
        print("Error during lesson creation:", e)  # 👈 print the actual crash
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Get all lessons
@lesson_router.get("/", response_model=List[LessonResponse])
async def get_lessons():
    lessons = await Lesson.find_all().to_list()
    return [
        LessonResponse(id=str(lesson.id), **lesson.model_dump(exclude={"id"}))
        for lesson in lessons
    ]

@lesson_router.get("/approved", response_model=List[LessonResponse])
async def get_approved_lessons():
    try:
        lessons = await Lesson.find(Lesson.status == "approved").to_list()
        return [
            LessonResponse(id=str(lesson.id), **lesson.model_dump(exclude={"id"}))
            for lesson in lessons
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@lesson_router.get("/review", response_model=List[LessonResponse])
async def get_lessons_for_review():
    try:
        lessons = await Lesson.find(Lesson.status == "pending_review").to_list()
        return [
            LessonResponse(id=str(lesson.id), **lesson.model_dump(exclude={"id"}))
            for lesson in lessons
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@lesson_router.put("/{lesson_id}/moderate", response_model=LessonResponse)
async def moderate_lesson(lesson_id: PydanticObjectId, data: FeedbackModerationRequest):
    lesson = await Lesson.get(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    if data.action == "approve":
        # Clear feedbacks and approve
        for obj in lesson.ru.objects:
            obj.feedback = None
        for obj in lesson.uz.objects:
            obj.feedback = None
        lesson.status = "approved"

    elif data.action == "reject":
        # Apply feedbacks and reject
        if data.ru_feedbacks:
            for idx, fb in enumerate(data.ru_feedbacks):
                if idx < len(lesson.ru.objects):
                    lesson.ru.objects[idx].feedback = fb
        if data.uz_feedbacks:
            for idx, fb in enumerate(data.uz_feedbacks):
                if idx < len(lesson.uz.objects):
                    lesson.uz.objects[idx].feedback = fb
        lesson.status = "rejected"

    await lesson.save()
    return JSONResponse(
        status_code=200,
        content={
            "id": str(lesson.id),
            "subject": lesson.subject,
            "module": lesson.module,
            "unit": lesson.unit,
            "duration": lesson.duration,
            "order": lesson.order,
            "video_url": lesson.video_url,
            "status": lesson.status,
            "ru": lesson.ru.model_dump() if hasattr(lesson.ru, "model_dump") else lesson.ru,
            "uz": lesson.uz.model_dump() if hasattr(lesson.uz, "model_dump") else lesson.uz
        }
    )

@lesson_router.put("/{lesson_id}", response_model=LessonResponse)
async def edit_lesson(lesson_id: PydanticObjectId, updated_data: LessonCreate):
    lesson = await Lesson.get(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    if lesson.status == "approved":
        raise HTTPException(status_code=400, detail="Approved lessons cannot be edited")

    # Updates fields
    lesson.subject = updated_data.subject
    lesson.module = updated_data.module
    lesson.unit = updated_data.unit
    lesson.duration = updated_data.duration
    lesson.order = updated_data.order
    lesson.video_url = updated_data.video_url
    lesson.status = updated_data.status
    lesson.ru = updated_data.ru
    lesson.uz = updated_data.uz

    await lesson.save()

    return LessonResponse(
        id=str(lesson.id),
        subject=lesson.subject,
        module=lesson.module,
        unit=lesson.unit,
        duration=lesson.duration,
        order=lesson.order,
        video_url=lesson.video_url,
        status=lesson.status,
        ru=lesson.ru,
        uz=lesson.uz,
    )

# ✅ Get a lesson by ID
@lesson_router.get("/{lesson_id}", response_model=LessonCreate)
async def get_lesson(lesson_id: PydanticObjectId):
    lesson = await Lesson.get(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

# ✅ Update lesson status (send for review)
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

# ✅ Delete lesson
@lesson_router.delete("/{lesson_id}")
async def delete_lesson(lesson_id: PydanticObjectId):
    lesson = await Lesson.get(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    await lesson.delete()
    return {"message": "Lesson deleted successfully"}
