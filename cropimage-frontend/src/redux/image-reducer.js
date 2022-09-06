import { cropImagePostRequest, sendImageRequest, getCroppedImage, deleteImg } from "../api/api";

const SET_IMAGE_PATH = "SET_IMAGE_PATH";
const CROP_IMAGE = "CROP_IMAGE";
const TOGGLE_IS_FETCHING= "TOGGLE_IS_FETCHING";

const initialState = {
    aboutImage: {
        imgPath: null,
        filename: null
    },
    cropProperties: null,
    isFetching: false
};

export const imageReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_IMAGE_PATH:
            return {
                ...state,
                aboutImage: { 
                    ...state.aboutImage,
                    ...action.data
                }
            }
        case CROP_IMAGE: 
            return {
                ...state,
                cropProperties: {...action.cropProperties}
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

export const setImagePathAC = (data) => ({type: SET_IMAGE_PATH, data})
export const cropImageAC = (cropProperties) => ({type: CROP_IMAGE, cropProperties})
export const setToFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const uploadImageThunk = (file) => {
    const data = new FormData();
    data.append('file', file, file.name);
    
    return (dispatch) => {
        return sendImageRequest(data).then(res => {
            dispatch(setImagePathAC({imgPath: res.request.responseURL, filename: file.name}));
            dispatch(setToFetching(false));
        })
    }
}

export const cropImageThunk = (cropProperties) => {
    return (dispatch) => {
        cropImagePostRequest(cropProperties).then(res => {
            return dispatch(cropImageAC(cropProperties))
        })
    }
}

export const getCroppedImageThunk = (filename) => {
    return (dispatch) => {
        return getCroppedImage(filename).then(res => {
          dispatch(setImagePathAC({imgPath: res.request.responseURL}))
          dispatch(setToFetching(false))
        })
    }
}

export const deleteImagesThunk = (filename) => {
    return (dispatch) => {
        return deleteImg(filename)
    }
}
