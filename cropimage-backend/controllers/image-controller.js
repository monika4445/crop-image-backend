import path from "path";
import fs from "fs";
import imageService from "../services/image-service.js";

async function cropImage(req, res) {
  try {
    res.send(await imageService.cropImage(req.body));
  } catch (e) {
    res.status(406).send({ message: e.error.message });
  }
}

function uploadImage(req, res) {
  return res.redirect(`/image/upload/${req.file.filename}`);
}

function getImage(req, res) {
  return res.sendFile(path.resolve(`uploads/${req.params.filename}`));
}

function getResult(req, res) {
  return res.sendFile(path.resolve(`uploads/cropped${req.params.filename}`));
}

function downloadImage(req, res) {
  return res.download(path.resolve(`uploads/cropped${req.params.filename}`));
}

function deleteImg(req, res) {
  if (fs.existsSync(path.resolve(`uploads/${req.params.filename}`))) {
    fs.unlinkSync(path.resolve(`uploads/${req.params.filename}`));
  }
  if (fs.existsSync(path.resolve(`uploads/cropped${req.params.filename}`))) {
    fs.unlinkSync(path.resolve(`uploads/cropped${req.params.filename}`));
  }
}

export default {
  cropImage,
  uploadImage,
  getResult,
  getImage,
  downloadImage,
  deleteImg,
};
