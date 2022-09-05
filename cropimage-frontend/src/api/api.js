import * as axios from 'axios'

export const sendImageRequest = (params) => {
    return axios.post('/image/upload', params)
}

export const cropImagePostRequest = (params) => {
    return axios.post('/image/crop', params)
}

export const getUploadedImg = (imgName) => {
    return axios.get(`image/upload/${imgName}`)
}

export const getCroppedImage = () => {
    return axios.get('image/result')
}

export const downloadImage = () => {
    return axios.get("image/download")
}


