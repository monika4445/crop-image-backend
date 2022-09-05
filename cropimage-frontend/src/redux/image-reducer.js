import { cropImagePostRequest, sendImageRequest, getCroppedImage } from "../api/api";

const SET_IMAGE_PATH = "SET_IMAGE_PATH";
const CROP_IMAGE = "CROP_IMAGE";
const TOGGLE_IS_FETCHING= "TOGGLE_IS_FETCHING";

const initialState = {
    aboutImage: null,
    cropProperties: null,
    isFetching: false
};

export const imageReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_IMAGE_PATH:
            return {
                ...state,
                aboutImage: action.data
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
export const cropImageThunk = (cropProperties) => {
    return (dispatch) => {
        cropImagePostRequest(cropProperties).then(res => {
            return dispatch(cropImageAC)
        })
    }
}
export const uploadImageThunk = (file) => {
    const data = new FormData();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    data.append('file', file);
    
    return (dispatch) => {
        return sendImageRequest(data).then(res => {
            dispatch(setImagePathAC(res.request.responseURL));
            dispatch(setToFetching(false));

        })
    }
}

export const getCroppedImageThunk = () => {
    return (dispatch) => {
        return getCroppedImage().then(res => {
          dispatch(setImagePathAC(res.request.responseURL))
          dispatch(setToFetching(false))
        })
    }
}