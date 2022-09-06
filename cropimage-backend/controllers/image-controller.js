import imageService from "../services/image-service.js";
import path from 'path'
import fs from 'fs'

function cropImage(req,res) {
    return res.send(imageService.cropImage(req.body))
}

function uploadImage(req, res) {
    return res.redirect(`/image/upload/${req.file.filename}`);
}

function getImage(req, res) {
    return res.sendFile(path.resolve(`uploads/${req.params.filename}`)) ;
}

function getResult(req, res) {
    return res.sendFile(path.resolve(`uploads/cropped${req.params.filename}`))
}

function downloadImage(req, res) {
    return res.download(path.resolve(`uploads/cropped${req.params.filename}`))
}

function deleteImg(req, res) {
    fs.unlinkSync(path.resolve(`uploads/${req.params.filename}`));
    fs.unlinkSync(path.resolve(`uploads/cropped${req.params.filename}`));
}

export default {
    cropImage,
    uploadImage,
    getResult,
    getImage,
    downloadImage,
    deleteImg
}