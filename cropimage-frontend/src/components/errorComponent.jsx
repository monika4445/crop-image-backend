import React from 'react';
import { VscDebugRestart } from 'react-icons/vsc'
import "../styles/errorComponent.css"

export const ErrorComponent = ({error, deleteImg, aboutImage}) => {
    const startNewHandler = () => {
        deleteImg(aboutImage.filename);

        window.location.reload(false); 
    }

    return (  
        <div>
            <p className='errorText'>{error}</p>
            <div className='buttPar'>
                <button className='startButton' onClick={startNewHandler}>TRY AGAIN <VscDebugRestart/></button>
            </div>
        </div>)
}