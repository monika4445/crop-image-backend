import sharp from "sharp";
import multer from "multer";


function cropImage({x, y, width, height}) {
    let originalImage = 'uploads/uploadedFile.jpg';
    
// file name for cropped image
    let outputImage = 'uploads/croppedImage.jpg';

    sharp(originalImage).extract({ width: Math.floor(width), height: Math.floor(height) , left: Math.floor(x), top: Math.floor(y)}).toFile(outputImage)
        .then(function(new_file_info) {
            console.log("Image cropped and saved");
        })
        .catch(function(err) {
            console.log("An error occured",err);
    });
}

function uploadImage() {
    const upload = multer({ dest: '../uploads/' })

    return upload.single('file')
}

export default {
    cropImage,
    uploadImage
}