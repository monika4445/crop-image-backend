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

export const getCroppedImage = (filename) => {
    return axios.get(`image/result/${filename}`)
}

export const deleteImg = (filename) => {
    return axios.delete(`image/${filename}`)
}


