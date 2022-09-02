import express from 'express'
import imageController from '../controllers/image-controller.js';
import multer from 'multer';

const router = express.Router();

var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            console.log(file.originalname)
            //How could I get the new_file_name property sent from client here?
            cb( null, 'uploadedFile.jpg' );
        }
    }
);
const upload = multer({storage})


router.post('/upload', upload.single('file'), imageController.uploadImage)
router.get('/upload/:name', imageController.getImage)
router.post('/crop', imageController.cropImage)


export default router