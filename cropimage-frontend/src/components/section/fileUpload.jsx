import React, { useRef } from 'react';
import '../../styles/fileUpload.css';

export const FileUpload = (props) => {
    const inputFileRef = useRef(null);

    const clickOnTheInputFile = () => {
        return inputFileRef.current.click();
    }
    const fileInputHandler = (e) => {
        const file = e.target.files[0];

        props.setImagePath(file);
        props.setForEdit(true);
        props.setToFetching(true);
    }

    return (
        <div className="fileUpload">
            <input type='file' ref={inputFileRef} onChange={fileInputHandler} style={{"display": "none"}}></input>
            <button className="btn" onClick={clickOnTheInputFile}>Select Image From Local Drive<span className="fas fa-chevron-right"></span></button>
            <button className="btn"> Select Image From Google Drive <span className="fas fa-chevron-right"></span> </button>
            <button className="btn"> Select Image From Dropbox <span className="fas fa-chevron-right"></span> </button>
        </div>
    )
}
