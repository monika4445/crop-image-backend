import React, { useRef, useState } from 'react';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {Loader} from "../../shared/loader.jsx"
import '../../styles/makeToEdit.css'
import '../../styles/inputNum.scss'

export const MakeToEdit = (props) => {
    const [cropCoordinates, setCropCoordinates] = useState({
        unit: 'px',
        x: 25,
        y: 25,
        width: 50,
        height: 50
    });
    const imageRef = useRef(null);

    const setToCropImage = (e) => {
        setCropCoordinates(e)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const {offsetWidth, offsetHeight} = imageRef.current;

        props.cropImage({...cropCoordinates, offsetWidth, offsetHeight, filename: props.aboutImage.filename});
        props.setToFetching(true);
    }

    const changeCropValue = (e) => {
        switch(e.target.name) {
            case "width": 
                if (imageRef.current.offsetWidth  < e.target.value) {
                    e.target.value = cropCoordinates.width;
                }
                break;
            case "height": 
                if (imageRef.current.offsetHeight < e.target.value) {
                    e.target.value = cropCoordinates.height;
                }
                break;
            default: break;
        }

        return setCropCoordinates({
                ...cropCoordinates,
                [e.target.name] : e.target.value
            })
    }
    return (
        <div className='makeToEdit'>
            {props.isFetching ? 
            <div>
                <Loader />
            </div> :
            <form className='imageForm' onSubmit={submitHandler}>
                <div className='imagePart'>
                    <ReactCrop crop={cropCoordinates} onChange={setToCropImage} className="parentImgForCrop" >
                        <img className='imageForCrop' src={props.aboutImage.imgPath} alt="imgForCropping" ref={imageRef}/>
                    </ReactCrop>
                </div>
                <div className='cropPart'>
                    <div className='cropOptionsPart'>
                        <div className='cropOptions'>
                            CROP OPTIONS
                        </div>
                        <div className='optionsPart'>
                            <label htmlFor='width' className='optionLabels'>Width(px)</label>
                            <input className="numberstyle" type="number"  name='width' min="1" step="1"  onChange={changeCropValue} value={cropCoordinates ? Math.round(cropCoordinates.width) : 0} />
                        </div>
                        <div className='optionsPart'>
                            <label htmlFor='height' className='optionLabels'>Height(px)</label>
                            <input className="numberstyle" type="number" name='height' min="1" step="1" onChange={changeCropValue} value={cropCoordinates ? Math.round(cropCoordinates.height) : 0}/>
                        </div>
                     </div>
                    <div className='cropButtonDiv'>
                            <button type='submit' className='cropButton'>CROP</button>
                    </div>
                </div>
            </form>
            }
        </div>
    )
}