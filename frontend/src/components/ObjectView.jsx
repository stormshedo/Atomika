import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import React from 'react'
import ReactPlayer from 'react-player'

const ObjectView = (props) => {
    const { t, i18n } = useTranslation();
    const lesson = props.lesson;
    const [ editLang, setEditLang ] = useState(i18n.language);
    useEffect(() => {
        setEditLang(i18n.language);
    }, [i18n.language, t]);

    console.log(editLang)
    return(
        <div className="max-w-[65%] w-full mb-16 max-md:max-w-full">
            <h1 className="text-[34px]">{lesson[editLang].title}</h1>
            <p className="text-button pt-[13px] pb-[26px]">{t('lesson')} {lesson.order}</p>
            {lesson.video_url ? <div className="mb-[26px] rounded-2xl overflow-hidden w-full aspect-video"><ReactPlayer url={lesson.video_url} width="100%" height="100%" className="rounded-2xl" /></div> : null}
            <div className="flex flex-col gap-4">
            {lesson[editLang].objects.map((object, order) => object.image ?  (
                <div className="flex gap-1.5 w-full" key={order}>
                    <img src={object.image} className="rounded-2xl w-full object-cover"></img>
                </div>
                ) : object.video_url ? (<div key={order} className="w-full aspect-video rounded-2xl overflow-hidden">
                    <ReactPlayer url={object.video_url} width="100%" height="100%" controls /></div>
                ) : (
                    <div key={order} className="bg-white rounded-2xl px-[26px] py-8">
                    <div className="text-[18px]/[140%] break-words" dangerouslySetInnerHTML={{
                        __html: object.text || "<p><em>Nothing to display</em></p>"
                    }} />
                </div>
                )
            )}
            </div>
        </div>
    )
}

export default ObjectView;