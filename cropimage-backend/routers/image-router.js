import express from 'express'
import imageController from '../controllers/image-controller.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);
const upload = multer({storage});

router.post('/upload', upload.single('file'), imageController.uploadImage);
router.get('/upload/:filename', imageController.getImage);
router.get('/result/:filename', imageController.getResult);
router.post('/crop', imageController.cropImage);
router.get('/download/:filename', imageController.downloadImage);
router.delete('/:filename', imageController.deleteImg);

export default router;