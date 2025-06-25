import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const TeacherLessonCard = (props) => {
    const { t, i18n } = useTranslation();
    const [ lessonInfo, setLessonInfo ] = useState(i18n.language == "ru" ? props.lesson.ru : props.lesson.uz);
    useEffect(() => {
        if (i18n.language === 'ru') {
        setLessonInfo( props.lesson.ru);
        } else if (i18n.language === 'uz') {
        setLessonInfo( props.lesson.uz);
        } else {
        setLessonInfo( props.lesson.ru); // fallback
        }
    }, [i18n.language]);

    let status = props.lesson.status;
    let statusClass;
    let link = "";
    if(status === "approved") {
        statusClass = "text-green-600 bg-green-100";
        status = `${t('approved')}`;
        link = `/teacher/lesson/${props.index}`;
    }
    else if(status === "pending_review") { 
        statusClass = "text-yellow-400 bg-yellow-100";
        status = `${t('pending')}`;
        link = `/teacher/edit/${props.index}`;
    }
    else if(status === "draft") { 
        statusClass = "text-black-400 bg-gray-100";
        status = `${t('draft')}`;
        link = `/teacher/edit/${props.index}`;
    }
    else {
        statusClass = "text-red-600 bg-red-100"
        status = `${t('declined')}`;
        link = "";
    }

    return(
        <div className="py-1">
            <Link to={link} state={{ editLessonData: props.lesson, index: props.index }}className="flex justify-between items-center py-3 px-5.5 w-full cursor-pointer text-blue">
                <div className="bg-gra">
                    <p>{lessonInfo.title}</p> 
                </div>
                <div>
                    <p className={statusClass + " px-4 py-1 rounded-[8px]"}>{status}</p>
                </div>
            </Link>
        </div>
    )
}

export default TeacherLessonCard;