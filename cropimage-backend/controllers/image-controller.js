import imageService from "../services/image-service.js";
import path from 'path'
import fs from 'fs'

async function cropImage(req, res, next) {
    try {
        res.send(await imageService.cropImage(req.body));
    } catch(e) {
        console.log(e,4646546464)
        res.status(406).send({message: e.error.message})
    }
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