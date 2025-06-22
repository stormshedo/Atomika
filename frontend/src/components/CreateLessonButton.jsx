import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const CreateLessonButton = (props) => {
    const { t, i18n } = useTranslation();

        return(
            <div className="bg-white md:w-1/6 rounded-full max-md: w-2/5 max-sm:w-full">
                <Link to="/teacher/create" state={props.onCreate} className="text-center"><p className="py-4 text-center">{t('createLesson')}</p></Link>
            </div>
        )
}

export default CreateLessonButton;