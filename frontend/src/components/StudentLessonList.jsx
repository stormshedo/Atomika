import React from "react";
import CreateLessonButton from "./CreateLessonButton";
import { useTranslation } from 'react-i18next';
import StudentLessonCard from "./StudentLessonCard";

const StudentLessonList = (props) => {
    const { t } = useTranslation();
        if(props.lessons.length > 0) {
            return (
                <div className="w-4/5 mx-auto flex gap-8 justify-center items-start max-md:flex-col">
                    <div className="w-3/5 flex flex-col gap-3 max-md:w-full">
                        {props.lessons.map((lesson, index) => (
                            <StudentLessonCard lesson={lesson} key={index} index={index} lessonsNumber={props.lessons.length} />
                        ))}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <p className="text-center">{t('noLessons')}</p>
                </div>
            )
        }
}

export default StudentLessonList;