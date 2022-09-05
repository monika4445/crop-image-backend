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
    const [toCrop, setToCrop] = useState(null);

    const setToCropImage = (e) => {
        setCropCoordinates(e)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const {offsetWidth, offsetHeight} = imageRef.current;

        setToCrop(true)

        return props.cropImage({...cropCoordinates, offsetWidth, offsetHeight});
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

    const croppedResultHandler = (e) => {
        props.setForShare(true)
        props.getResult();
        props.setToFetching(true)
    }

    const loadImg = (e) => {
        const { naturalWidth, naturalHeight, offsetHeight, offsetWidth} = e.target;

        if (naturalWidth > naturalHeight) {
            imageRef.current.style.width = offsetWidth;
            imageRef.current.style.height = (naturalWidth / naturalHeight) * offsetHeight;
        }
    }

    return (
        <div className='makeToEdit'>
            {props.isFetching ? 
            <div>
                <Loader />
            </div> :
            
            <form className='imageForm' onSubmit={submitHandler}>
                <div className='imagePart'>
                    <ReactCrop crop={cropCoordinates} onChange={setToCropImage} className="parentImgForCrop">
                        <img className='imageForCrop' src={props.aboutImage} onLoad={loadImg} alt="imgForCropping" ref={imageRef}/>
                    </ReactCrop>
                </div>
            
                <div className='cropButtonPart'>
                    <div className='cropOptions'>
                        CROP OPTIONS
                    </div>
                    <div className='optionsPart'>
                        <label htmlFor='width' className='optionLabels'>Width(px)</label>
                        <input className="numberstyle" type="number"  name='width' min="1" step="1"  onChange={changeCropValue} value={cropCoordinates ? cropCoordinates.width : 0} />
                    </div>
                    <div className='optionsPart'>
                        <label htmlFor='height' className='optionLabels'>Height(px)</label>
                        <input className="numberstyle" type="number" name='height' min="1" step="1" onChange={changeCropValue} value={cropCoordinates ? cropCoordinates.height : 0}/>
                    </div>
                    <button className='cropButton' type='submit'>CROP</button>
                    {toCrop &&  
                        <button onClick={croppedResultHandler}>SEE RESULT</button>
                    }
                </div>
            </form>
            }
        </div>
    )
}