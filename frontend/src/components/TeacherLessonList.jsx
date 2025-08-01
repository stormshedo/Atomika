import React from "react";
import TeacherLessonCard from "./TeacherLessonCard";
import CreateLessonButton from "./CreateLessonButton";
import { useTranslation } from 'react-i18next';

const TeacherLessonList = (props) => {
    const { t } = useTranslation();
        if(props.lessons.length > 0) {
            return (
                <div className="w-4/5 mx-auto flex gap-8 justify-center items-start max-md:flex-col">
                    <CreateLessonButton onCreate={props.onCreate}/>

                    <div className="w-3/5 bg-white rounded-3xl flex flex-col max-md:w-full">
                        {props.lessons.map((lesson, index) => (
                            <TeacherLessonCard lesson={lesson} key={index} index={index} />
                        ))}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="flex flex-col justify-center items-center gap-4">
                    <p>{t('noLessons')}</p>
                    <CreateLessonButton onCreate={props.onCreate} />
                </div>
            )
        }
}

export default TeacherLessonList;