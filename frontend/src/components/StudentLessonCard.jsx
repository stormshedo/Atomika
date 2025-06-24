import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

const StudentLessonCard = (props) => {
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
    if(status === "approved") {
        statusClass = "text-green-600 bg-green-100";
        status = `${t('approved')}`;
    }
    else if(status === "pending_review") { 
        statusClass = "text-yellow-400 bg-yellow-100";
        status = `${t('pending')}`;
    }
    else if(status === "draft") { 
        statusClass = "text-black-400 bg-gray-100";
        status = `${t('draft')}`;
    }
    else {
        statusClass = "text-red-600 bg-red-100"
        status = `${t('declined')}`;
    }

    return(
        <div className="py-1 bg-white rounded-2xl">
            <Link to={`/student/lesson/${props.index}`}  className="flex gap-3 items-center py-3 px-5.5 w-full cursor-pointer text-blue">
                <div>
                    <PlayCircleIcon className="w-10 h-10 text-gray-400" />
                </div>
                <div className="flex justify-start gap-1.5 flex-col items-start">
                    <div className="flex gap-3">
                        <p className="text-button">{t('topic')}</p> <p className="text-button">{t('lesson')} {props.index+1}/{props.lessonsNumber}</p>
                    </div>
                    <div className="bg-gra">
                        <p className="text-[20px]">{lessonInfo.title}</p> 
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default StudentLessonCard;