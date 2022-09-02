import React, { useState } from 'react';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import '../styles/makeToEdit.css'


export const MakeToEdit = (props) => {
    const [cropCoordinates, setCropCoordinates] = useState()

    const setToCropImage = (e) => {
        console.log(e)
        setCropCoordinates(e)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(cropCoordinates)
        props.cropImage(cropCoordinates);
    }

    return (
        <form onSubmit={submitHandler}>
            <ReactCrop crop={cropCoordinates} onChange={setToCropImage}>
                <img className='imageForCrop' src={props.aboutImage} alt="imgForCropping"/>
            </ReactCrop>
            <div>
                <button style={{"backgroundColor": "green"}} type='submit'>CROP</button>
            </div>
        </form>
    )
}