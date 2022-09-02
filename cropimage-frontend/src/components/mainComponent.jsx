import { useState } from "react";
import { FileUpload } from "./fileUpload";
import { MakeToEdit } from "./makeToEdit";

export const MainComponent = (props) => {
    const [isReadyForEdit, setForEdit] = useState();
  
    return (
      <div className='App'>
        {isReadyForEdit ? <MakeToEdit aboutImage={props.aboutImage} cropImage = {props.cropImage} /> : <FileUpload setImagePath={props.setImagePath} setForEdit={setForEdit} />}
      </div>
    );
  }