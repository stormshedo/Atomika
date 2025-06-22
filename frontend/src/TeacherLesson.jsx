import Header from "./components/Header";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import ObjectView from "./components/ObjectView";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from '@heroicons/react/20/solid';


const TeacherLesson = (props) => {
    const { t, i18n } = useTranslation();
    const { lessonId } = useParams();
    const lesson = props.lessons[lessonId];
    const [ lessonInfo, setLessonInfo ] = useState(i18n.language == "ru" ? lesson.ru : lesson.uz);
    useEffect(() => {
        if (i18n.language === 'ru') {
        setLessonInfo(lesson.ru);
        } else if (i18n.language === 'uz') {
        setLessonInfo(lesson.uz);
        } else {
        setLessonInfo(lesson.ru); // fallback
        }
    }, [i18n.language]);
    return(
        <div>
            <Header />
            <div className="flex gap-24 px-10 items-start justify-between max-md:flex-col">
                <div className="w-[17.5%] max-md:w-full"><Link to="/teacher" className="w-fit flex items-center px-12 py-6 text-button bg-white rounded-full lh-[1px] text-[18px]"><ChevronLeftIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />{t('back')}</Link></div>
                <ObjectView lesson={lesson} />
                <div className="w-[17.5%] max-md:w-full"></div>
            </div>
        </div>
    )
}

export default TeacherLesson;