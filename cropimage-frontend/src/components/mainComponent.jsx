import React, { useState } from "react";
import { FileUpload } from "./section/fileUpload";
import { MakeToEdit } from "./section/makeToEdit";
import '../styles/main.css'
import { Header } from "./header/header";
import { MakeForShare } from "./section/makeForShare";
import { ErrorComponent } from "./errorComponent";

export const MainComponent = ({aboutImage, error, isFetching, deleteImg, isReadyForShare, getResult, setToFetching, cropImage, setImagePath}) => {
    const [isReadyForEdit, setForEdit] = useState(false);
  
    return (
      <div className='App'>
        <Header />
        <section className="home" id="home">
          {error ? 
            <ErrorComponent error ={error} deleteImg={deleteImg} aboutImage={aboutImage}
            />  
          : isReadyForShare ? 
            <MakeForShare 
              aboutImage={aboutImage} 
              isFetching={isFetching}
              deleteImg={deleteImg}
              getResult={getResult}
            /> :
          isReadyForEdit ? 
            <MakeToEdit 
              aboutImage={aboutImage} 
              isFetching={isFetching}
              cropImage={cropImage}
              setToFetching={setToFetching}
            /> : 
            <FileUpload 
              setImagePath={setImagePath} 
              setForEdit={setForEdit} 
              setToFetching={setToFetching}
            />
          }
        </section>
      </div>
    );
  }