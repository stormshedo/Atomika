import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ModerActionPanel = (props) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const handleSubmit = async (e, action) => {

    try {
      const response = await axios.put(`https://ecf1-90-156-165-231.ngrok-free.app/lessons/${props.lessonId}/moderate`, {
        "action": action,
        "ru_feedbacks": [
            "string",
            null
        ],
        "uz_feedbacks": [
            "string",
            null
        ]
        }, {headers: { "ngrok-skip-browser-warning": 435346 }});
      await props.refetchM();
      props.refetch();
      props.refetchS();
      navigate("/moder");
    } catch (error) {
      console.error('Error:', error);
    }
  };

    return(
        <div className="fixed bottom-5 right-5 flex flex-col gap-2">
            <button type="button" onClick={(e) => handleSubmit(e, "approve")} className="actionButton text-[20px] px-5 bg-green-500">{t('approve')}</button>
            <button type="button" onClick={(e) => handleSubmit(e, "reject")} className="actionButton text-[20px] px-5 bg-red-500">{t('reject')}</button>
        </div>
    )
}

export default ModerActionPanel;