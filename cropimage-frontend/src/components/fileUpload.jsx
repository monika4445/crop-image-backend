import React, { useRef } from 'react';

export const FileUpload = (props) => {
    const inputFileRef = useRef(null);

    const clickOnTheInputFile = () => {
        return inputFileRef.current.click();
    }
    const fileInputHandler = (e) => {
        const file = e.target.files[0];
        console.log(file)
        props.setImagePath(file);
        props.setForEdit(true);
    }

    return (
        <div>
            <button onClick={clickOnTheInputFile}>SELECT IMAGE</button>
            <input type='file' ref={inputFileRef} onChange={fileInputHandler} style={{"display": "none"}}></input>
        </div>
    )
}
