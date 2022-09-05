import express from 'express'
import imageController from '../controllers/image-controller.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            cb( null, 'uploadedFile.jpg' );
        }
    }
);
const upload = multer({storage})

router.post('/upload', upload.single('file'), imageController.uploadImage)
router.get('/upload', imageController.getImage)
router.get('/result', imageController.getResult)
router.post('/crop', imageController.cropImage)
router.get('/download', imageController.downloadImage)

export default router