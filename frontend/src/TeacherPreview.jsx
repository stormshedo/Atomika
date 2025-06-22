import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import ObjectView from "./components/ObjectView";
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

const TeacherPreview = () => {
    const location = useLocation();
    const { lessonData } = location.state || {};
    const { t, i18n } = useTranslation();

    return(
        <div>
            <Header />
            <div className="flex gap-24 px-10 items-start justify-between max-md:flex-col">
                <div className="w-[17.5%] max-md:w-full"><Link to="/teacher/create" state={{ previewLessonData: lessonData}} className="w-fit flex items-center px-12 py-6 text-button bg-white rounded-full lh-[1px] text-[18px]"><ChevronLeftIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />{t('back')}</Link></div>
                <ObjectView lesson={lessonData} />
                <div className="w-[17.5%] max-md:w-full"></div>
            </div>
        </div>
    )
}

export default TeacherPreview;