import { cropImagePostRequest, sendImageRequest } from "../api/api";

const SET_IMAGE_PATH = "SET_IMAGE_PATH";
const CROP_IMAGE = "CROP_IMAGE";

const initialState = {
    aboutImage: null,
    cropProperties: null
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
        default:
            return state;
    }
}

export const setImagePathAC = (data) => ({type: SET_IMAGE_PATH, data})
export const cropImageAC = (cropProperties) => ({type: CROP_IMAGE, cropProperties})
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

    reader.readAsDataURL(file)
    

    data.append('file', file);
    return (dispatch) => {
        return sendImageRequest(data).then(res => {
            console.log(res)
            dispatch(setImagePathAC(reader.result));
        })
    }

}