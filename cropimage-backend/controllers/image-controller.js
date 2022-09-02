import imageService from "../services/image-service.js";
import path from 'path'

function cropImage(req,res) {
    console.log(req.body)
    return res.send(imageService.cropImage(req.body));
}

function uploadImage(req, res) {
   
   return res.redirect('/image/upload/uploadedFile')
}

function getImage(req, res) {
    return res.send(path.resolve(`uploads/${req.params.name}.jpg`));
}

export default {
    cropImage,
    uploadImage,
    getImage
}