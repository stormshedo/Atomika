import React from "react";
import CreateLessonButton from "./CreateLessonButton";
import { useTranslation } from 'react-i18next';
import ModerLessonCard from "./ModerLessonCard";

const ModerLessonList = (props) => {
    const { t } = useTranslation();
        if(props.lessons.length > 0) {
            return (
                <div className="w-4/5 mx-auto flex gap-8 justify-center items-start max-md:flex-col">
                    <div className="w-3/5 bg-white rounded-3xl flex flex-col max-md:w-full">
                        {props.lessons.map((lesson, index) => (
                            <ModerLessonCard lesson={lesson} key={index} index={index} lessons={props.lessons} />
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

export default ModerLessonList;