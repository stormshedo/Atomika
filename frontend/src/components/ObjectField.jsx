import { useState } from "react";
import TextObjectField from "./TextObjectField";
import { useTranslation } from "react-i18next";

const ObjectField = (props) => {
    const { t, i18n } = useTranslation();

    return(
        <div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <input value={props.object.order} placeholder={t('objectOrder')} onChange={(e) => props.onOrderChange(props.index, e.target.value, "order")} className="creationInput w-30" />
                    <input value={props.object.image} placeholder={t('imageLink')} onChange={(e) => props.onImageChange(props.index, e.target.value, "image")} className="creationInput w-full flex-1" />
                </div>
                <input value={props.object.video_url} placeholder={t('videoLink')} onChange={(e) => props.onVideoChange(props.index, e.target.value, "video_url")} className="creationInput w-full flex-1" />
            </div>
            <div className="mt-4">
                <TextObjectField object={props.object} index={props.index} onTextChange={props.onTextChange} />
            </div>
        </div>
    )
}

export default ObjectField;