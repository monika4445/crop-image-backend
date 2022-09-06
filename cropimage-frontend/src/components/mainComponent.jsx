import React, { useState } from "react";
import { FileUpload } from "./section/fileUpload";
import { MakeToEdit } from "./section/makeToEdit";
import '../styles/main.css'
import { Header } from "./header/header";
import { MakeForShare } from "./section/makeForShare";

export const MainComponent = (props) => {
    const [isReadyForEdit, setForEdit] = useState();
    const [isReadyForShare, setForShare] = useState();
  
    return (
      <div className='App'>
        <Header />
        <section className="home" id="home">
        {isReadyForShare ? 
            <MakeForShare 
              aboutImage={props.aboutImage} 
              error={props.error}
              isFetching={props.isFetching}
              deleteImg={props.deleteImg}
              getResult={props.getResult}
            /> :
        isReadyForEdit ? 
            <MakeToEdit 
              aboutImage={props.aboutImage} 
              isFetching={props.isFetching}
              cropImage={props.cropImage}
              setToFetching={props.setToFetching}
              setForShare={setForShare} 
            /> : 
            <FileUpload 
              setImagePath={props.setImagePath} 
              setForEdit={setForEdit} 
              setToFetching={props.setToFetching}
            />
        } 
        </section>
      </div>
    );
  }