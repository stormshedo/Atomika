import { useState, useEffect } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import Select from "./components/Select";
import ObjectField from "./components/ObjectField";
import TeacherActionPanel from "./components/TeacherActionPanel";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const TeacherCreate = (props) => {
    const location = useLocation();
    const { previewLessonData } = location.state || {};
    const navigate = useNavigate();
    useEffect(() => {
    if (previewLessonData) {
        navigate(location.pathname, { replace: true });
    }
    }, []);
    const { t, i18n } = useTranslation();
    const initialLessonData = {
        order: props.createLesson.length+1,
        status: "",
        subject: "Биология",
        module: "Модуль",
        unit: "Юнит",
        duration: "",
        video_url: "",
        ru: {
            title: "",
            objects: [
            ]
        },
        uz: {
            title: "",
            objects: [
            ]
        }
    };

    const [ lessonData, setLessonData ] = useState(previewLessonData ? previewLessonData : initialLessonData);

    const handleCreateLesson = async (status) => {
    try {
        const updatedLessonData = { 
            ...lessonData, 
            status: status 
        };

        const response = await axios.post("https://c7a8-90-156-162-134.ngrok-free.app/lessons/", updatedLessonData);
      console.log("Lesson created:", response.data);
      props.refetch();
      props.refetchM();
      navigate("/teacher");
    } catch (error) {
      console.error("Error creating lesson:", error);
    }
    };

    const setLessonLangData = (key, value) => {
        setLessonData(prev => ({
            ...prev,
            [editLang]: {
                ...prev[editLang],
                [key]: value
            }
        }))
    }

    const onChange = (key, value) => {
        setLessonData(prev => ({
        ...prev,
        [key]: value
        }));
    };

    const [ editLang, setEditLang ] = useState("ru");

    const onEditLangChange = (value) => {
        if(value.option == "Русский") setEditLang("ru");
        else if(value.option == "O'zbek") setEditLang("uz");
    }

    const addObject = (object) => {
    setLessonData(prev => ({
        ...prev,
        [editLang]: {
        ...prev[editLang], // keep all other keys like `title`
        objects: [
            ...prev[editLang].objects,
            {
            order: prev[editLang].objects.length,
            text: "",
            video_url: "",
            image: "",
            }
        ]
        }
    }));
        console.log(lessonData);
    };

    const handleTextChange = (index, value, key) => {
        setLessonData(prev => {
        // Copy existing objects
        const updatedObjects = [...prev[editLang].objects];
        // Replace one object with updated text
        updatedObjects[index] = {
        ...updatedObjects[index],
        [key]: value
        };
        return {
        ...prev,
        [editLang]: {
            ...prev[editLang],
            objects: updatedObjects
        }
        };
    });
    }

    return(
        <div>
            <Header />
            <h1 className="text-[34px] text-center mb-[30px]">{t('createLessonTitle')}</h1>
            <div className="flex gap-4 w-4/5 max-w-[1200px] mx-auto justify-center">
                <form className="flex flex-col gap-4 justify-center items-start mx-auto">

                    <div className="flex flex-col gap-4">
                        <p className="text-[28px]">{t('chooseLessonParent')}</p>
                        <div className="flex gap-4">
                            <Select defaultValue={lessonData.subject == "Биология" || lessonData.subject == "Biologiya" ? {id: 0, option:t('biology')} : {id:1, option:t('chemistry')}} valueKey={"subject"} onChange={onChange} options={[{id: 0, option:t('biology')}, {id:1, option: t('chemistry')}]} />
                            <Select defaultValue={{id: 0, option: t('module')}} valueKey={"module"} onChange={onChange} options={[{id: 0, option:t('module')}]} />
                            <Select defaultValue={{id: 0, option: t('unit')}} valueKey={"unit"} onChange={onChange} options={[{id: 0, option:t('unit')}]} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 flex-1 w-full">
                        <p className="text-[28px]">{t('chooseLessonParams')}</p>
                        <div className="flex gap-4 w-full items-center">
                            <input value={lessonData.order} placeholder={t('order')} onChange={(e) => onChange("order", e.target.value)} className="creationInput w-35" />
                            <input value={lessonData.duration} placeholder={t('duration')} onChange={(e) => onChange("duration", e.target.value)} className="creationInput w-35" />
                            <input value={lessonData.video_url} placeholder={t('videoLink')} onChange={(e) => onChange("video_url", e.target.value)} className="creationInput max-w-3x w-full flex-1"/> 
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 max-w-[808px]">
                        <p className="text-[28px]">{t('createLessonContent')}</p>
                        <div className="flex gap-4 items-center max-w-[808px]">
                            <Select defaultValue={{id: 0, option: "Русский"}} onLangChange={onEditLangChange} options={[{id:0, option: "Русский"}, {id:1, option:"O'zbek"}]}/>
                            <input value={lessonData[editLang].title} placeholder="Lesson name" onChange={(e) => setLessonLangData("title", e.target.value)} className="creationInput" />
                            <div className="flex gap-2 items-center">{t('addobject')}<button type="button" className="bg-white border-none text-button text-3xl pb-1 px-3 rounded-[8px] cursor-pointer" onClick={addObject}>+</button></div>
                        </div>
                    </div>
                    <p className="text-[28px]">{t('objects')}</p>
                    {lessonData[editLang].objects.length <= 0 ? <p className="text-center">{t('noobjects')}</p> : ""}
                    <div className="flex flex-col gap-8">
                        {lessonData[editLang].objects.map((obj, index) => (
                            <ObjectField
                                key={`${editLang}-${index}`}   
                                object={obj}
                                index={index}
                                onTextChange={handleTextChange}
                                onVideoChange={handleTextChange}
                                onImageChange={handleTextChange}
                                onOrderChange={handleTextChange}
                            />
                        ))}
                    </div>
                </form>
            </div>

            <TeacherActionPanel lessonData={lessonData} onSave={handleCreateLesson} />
        </div>
    )
}

export default TeacherCreate;