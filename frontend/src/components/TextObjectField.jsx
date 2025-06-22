import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useState } from "react";

const TextObjectField = (props) => {
    const modules = {
    toolbar: [
        [{ 'font': [] }, { 'size': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'header': '1'}, { 'header': '2' }, 'blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
        ['direction', { 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']  // remove formatting
    ]
    };

    // Allowed formats
    const formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'header', 'blockquote', 'code-block',
    'list', 'indent',
    'direction', 'align',
    'link', 'image', 'video'
    ];

    return(
        <div className="max-w-[562px]">
            <ReactQuill 
            className="bg-white border-none overflow-hidden min-h-48 rounded-lg shadow-sm focus-within:ring-1 focus-within:ring-atomika" 
            theme="snow" modules={modules} formats={formats} 
            onChange={(value) => props.onTextChange(props.index, value, "text")} 
            value={props.object.text} />

            {/* <div className="ql-container ql-snow">
                <div className="ql-editor"
                    dangerouslySetInnerHTML={{
                        __html: text || "<p><em>Nothing to display</em></p>"
                    }}
                />
            </div> */}
        </div>
    )
}

export default TextObjectField;