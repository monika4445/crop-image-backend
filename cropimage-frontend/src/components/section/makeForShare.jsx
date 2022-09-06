import React, { useRef } from 'react';
import { Loader } from "../../shared/loader.jsx"
import "../../styles/makeForShare.css"
import { FaDownload } from "react-icons/fa"
import { VscDebugRestart } from 'react-icons/vsc'
import {
    FacebookIcon,
    FacebookShareButton,
    PinterestShareButton,
    PinterestIcon,
    RedditIcon,
    RedditShareButton,
    VKShareButton,
    VKIcon
  } from "react-share";

export const MakeForShare = (props) => {
    const imgForShreRef = useRef(null);
 
  

    const startNewHandler = () => {
        props.deleteImg(props.aboutImage.filename);

        window.location.reload(false) 
    }

    return (
        <div className='makeForShare'> 
            {props.isFetching ? 
                <div>
                    <Loader />
                </div> :
                <>
                <div className='shareImgPart'>
                    <div className='shareImgParentDiv'>
                        <img src={props.aboutImage.imgPath} alt="croppedImage" ref={imgForShreRef}/>
                    </div>
                    <div className='sharePart'>
                        <div className='startNewDiv'>
                            <button className='startButton' onClick={startNewHandler}>TRY AGAIN <VscDebugRestart/></button>
                        </div>
                        <div className='downloadDiv'>
                            <a href={`http://localhost:4000/image/download/${props.aboutImage.filename}`} className="downloadButton" download>Download <FaDownload/></a>
                        </div>
                        <div className="shareBox">
                            <div className="box-container">
                                <div className="boxPart">
                                    <h3>Share Your Image</h3>
                                    
                                    <ul className="social-buttons">
                                        <FacebookShareButton url={`http://localhost:4000/image/result/${props.aboutImage.filename}`}>
                                            <FacebookIcon size={40} round={true} />
                                        </FacebookShareButton>
                                        <PinterestShareButton url={`http://localhost:4000/image/result/${props.aboutImage.filename}`}>
                                            <PinterestIcon size={40} round={true} />
                                        </PinterestShareButton>
                                        <RedditShareButton url={`http://localhost:4000/image/result/${props.aboutImage.filename}`}>
                                            <RedditIcon size={40} round={true} />
                                        </RedditShareButton>
                                        <VKShareButton url={`http://localhost:4000/image/result/${props.aboutImage.filename}`}>
                                            <VKIcon size={40} round={true} />
                                        </VKShareButton>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                </>
            }
            
        </div>
        
    )
}