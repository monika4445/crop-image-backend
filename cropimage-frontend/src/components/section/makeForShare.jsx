import React, { useRef } from 'react';
import { Loader } from "../../shared/loader.jsx"
import "../../styles/makeForShare.css"
import { FaDownload } from "react-icons/fa"

export const MakeForShare = (props) => {
    const imgForShreRef = useRef(null)

    return (
        <div className='makeForShare'> 
            {props.isFetching ? 
                <div>
                    <Loader />
                </div> :
                <div className='shareImgPart'>
                    <div className='shareImgParentDiv'>
                        <img src={props.aboutImage} alt="croppedImage" ref={imgForShreRef}/>
                    </div>
                    <div className='sharePart'>
                        <div className='downloadDiv'>
                            <a href="http://localhost:4000/image/download" className="downloadButton" download>Download <FaDownload/></a>
                        </div>
                    </div>
                </div>
            }
        </div>
        
    )
}