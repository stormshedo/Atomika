import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TeacherActionPanel = (props) => {
    const { t, i18n } = useTranslation();

    return(
        <div className="fixed bottom-5 right-5 flex flex-col gap-2">
            <Link to={`/teacher/create/preview`} state={{ lessonData: props.lessonData }} className="actionButton bg-blue-500">{t('preview')}</Link>
            <button type="button" onClick={() => props.onSave("draft")} className="actionButton bg-green-500">{t('asdraft')}</button>
            <button type="button" onClick={() => props.onSave("pending_review")} className="actionButton bg-atomika">{t('askreview')}</button>
        </div>
    )
}

export default TeacherActionPanel;