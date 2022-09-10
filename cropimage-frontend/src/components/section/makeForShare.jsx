import React, { useRef, useEffect } from 'react';
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

export const MakeForShare = ({aboutImage, deleteImg, isFetching, getResult }) => {
    const imgForShreRef = useRef(null);
    const mainPath = process.env.REACT_APP_MAIN_REQ_ROOT;

    useEffect(() => {
        getResult(aboutImage.filename);
    },[])

    const startNewHandler = () => {
        deleteImg(aboutImage.filename);

        window.location.reload(false) 
    }

    return (
        <div className='makeForShare'> 
            {isFetching ? 
                <div>
                    <Loader />
                </div> :
                <>
                    <div className='shareImgPart'>
                        <div className='shareImgParentDiv'>
                            <img src={aboutImage.imgPath} alt="croppedImage" ref={imgForShreRef}/>
                        </div>
                        <div className='sharePart'>
                            <div className='startNewDiv'>
                                <button className='startButton' onClick={startNewHandler}>TRY AGAIN <VscDebugRestart/></button>
                            </div>
                            <div className='downloadDiv'>
                                <a href={`${mainPath}/download/${aboutImage.filename}`} className="downloadButton" download>Download <FaDownload/></a>
                            </div>
                            <div className="shareBox">
                                <div className="box-container">
                                    <div className="boxPart">
                                        <h3>Share Your Image</h3>
                                        <ul className="social-buttons">
                                            <FacebookShareButton url={`${mainPath}/result/${aboutImage.filename}`}>
                                                <FacebookIcon size={40} round={true} />
                                            </FacebookShareButton>
                                            <PinterestShareButton url={`${mainPath}/result/${aboutImage.filename}`}>
                                                <PinterestIcon size={40} round={true} />
                                            </PinterestShareButton>
                                            <RedditShareButton url={`${mainPath}/result/${aboutImage.filename}`}>
                                                <RedditIcon size={40} round={true} />
                                            </RedditShareButton>
                                            <VKShareButton url={`${mainPath}/result/${aboutImage.filename}`}>
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