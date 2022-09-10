import React, { useRef, useEffect } from 'react';
import '../../styles/fileUpload.css';
import DropboxChooser from 'react-dropbox-chooser'
import * as axios from 'axios'
import useDrivePicker from 'react-google-drive-picker'

export const FileUpload = (props) => {
    const inputFileRef = useRef(null);
    const dropboxApyKey = process.env.REACT_APP_DROPBOX_API_KEY;
    const googleDriveKey = process.env.REACT_APP_GOOGLE_DRIVE_KEY;
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const [openPicker, authResult] = useDrivePicker();
    const oauthToken = useRef(null);

    useEffect(() => {
        if (authResult) {
          oauthToken.current = authResult.access_token;
        }
    }, [authResult]);

    function dropboxSuccess(dropBoxFile) {
        const dropboxlink = dropBoxFile[0].link;
        const dropBoxName = dropBoxFile[0].name;
        const dropBoxMimeType = "image/" + dropBoxName.slice(dropBoxName.lastIndexOf(".") + 1);
    
        axios.get(dropboxlink, {
            headers: {
            "Content-Type": "application/octet-stream",
            },
            responseType: "arraybuffer",
        }).then((res) => {
            let file = new Blob([res.data], { type: dropBoxMimeType });
            file.name = dropBoxName;

            props.setImagePath(file);
            props.setForEdit(true);
            props.setToFetching(true);
        });
    }

    const handleOpenPicker = () => {
        openPicker({
          clientId: googleClientId,
          developerKey: googleDriveKey,
          viewId: "DOCS_IMAGES",
          showUploadView: false,
          showUploadFolders: false,
          supportDrives: true,
          multiselect: false,
          callbackFunction: (data) => {
            if (data.action === "cancel") {
              return "User clicked cancel/close button";
            }
            if (data.action === "picked") {
              let doc = data.docs[0];
              axios.get(
                  "https://www.googleapis.com/drive/v3/files/" +
                    doc.id +
                    "?alt=media",
                  {
                    headers: { Authorization: "Bearer " + oauthToken.current },
                    responseType: "arraybuffer",
                  }
                )
                .then((res) => {
                  let file = new Blob([res.data], { type: doc.mimeType });

                  file.name = doc.name;
                  props.setImagePath(file);
                  props.setForEdit(true);
                  props.setToFetching(true);
                });
            }
          },
        })
    }

    const clickOnTheInputFile = () => {
        return inputFileRef.current.click();
    }
    const fileInputHandler = (e) => {
        const file = e.target.files[0];

        props.setImagePath(file);
        props.setForEdit(true);
        props.setToFetching(true);
    }

    const dragOver = (e) => {
        e.preventDefault();
        e.target.classList.add('active');
        e.target.textContent = 'Release to Upload';
    }

    const dragLeaveHandler = (e) => {
        e.target.classList.remove('active');
        e.target.textContent = 'Drag & Drop';
    }

    const dropHandler = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        props.setImagePath(file);
        props.setForEdit(true);
        props.setToFetching(true); 
    }

    return (
        <div className="fileUpload">
            <div className='upPartUpload'>
                <input type='file' accept='image/*' ref={inputFileRef} onChange={fileInputHandler} style={{"display": "none"}}></input>
                <button className="btn" onClick={clickOnTheInputFile}>Select Image From Local Drive<span className="fas fa-chevron-right"></span></button>
                <button className="btn">
                <DropboxChooser  
                    appKey={dropboxApyKey}
                    success={dropboxSuccess}
                    linkType="direct"
                    multiselect={false}
                    extensions={['.jpg','.png','.jpeg']} >Select Image From Dropbox<span className="fas fa-chevron-right"></span> 
                </DropboxChooser>
                </button>
                
                <button className="btn" onClick={handleOpenPicker}> Select Image From Google Drive <span className="fas fa-chevron-right"></span> </button>
            </div>
            <div className="dragDiv">
                <h3>Drop your file here</h3>
                <div onDragOver={dragOver} onDragLeave={dragLeaveHandler} onDrop={dropHandler} className="drag-area">
                    <div className="icon">
                    <i className="fas fa-images"></i>
                    </div>

                    <span className="header">Drag & Drop</span>
                    <span className="support">Supports: JPEG, JPG, PNG</span>
                </div>
            </div>
        </div>
    )
}
