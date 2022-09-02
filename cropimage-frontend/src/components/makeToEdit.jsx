import React, { useRef, useState } from 'react';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import '../styles/makeToEdit.css'


export const MakeToEdit = (props) => {
    const [cropCoordinates, setCropCoordinates] = useState();
    const imageRef = useRef(null)

    const setToCropImage = (e) => {
        setCropCoordinates(e)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(cropCoordinates)
        const {offsetWidth, offsetHeight} = imageRef.current;
        props.cropImage({...cropCoordinates, offsetWidth, offsetHeight});
    }

    return (
        <form onSubmit={submitHandler}>
            <ReactCrop crop={cropCoordinates} onChange={setToCropImage}>
                <img className='imageForCrop' src={props.aboutImage} alt="imgForCropping" ref={imageRef}/>
            </ReactCrop>
            <div>
                <button style={{"backgroundColor": "green"}} type='submit'>CROP</button>
            </div>
        </form>
    )
}