import * as axios from 'axios'

export const sendImageRequest = (params) => {
    console.log(params)
    return axios.post('/image/upload', params)

}

export const cropImagePostRequest = (params) => {
    return axios.post('/image/crop', params)
}


export const getUploadedImg = (imgName) => {
    return axios.get(`image/upload/${imgName}`)
}


