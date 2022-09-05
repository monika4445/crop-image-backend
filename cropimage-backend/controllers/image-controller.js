import imageService from "../services/image-service.js";
import path from 'path'

function cropImage(req,res) {
    return res.send(imageService.cropImage(req.body));
}

function uploadImage(req, res) {
    return res.redirect("/image/upload");
}

function getImage(req, res) {
    return res.sendFile(path.resolve("uploads/uploadedFile.jpg")) ;
}

function getResult(req, res) {
    return res.sendFile(path.resolve("uploads/croppedImage.jpg"))
}

function downloadImage(req, res) {
    return res.download(path.resolve("uploads/croppedImage.jpg"))
}

export default {
    cropImage,
    uploadImage,
    getResult,
    getImage,
    downloadImage
}