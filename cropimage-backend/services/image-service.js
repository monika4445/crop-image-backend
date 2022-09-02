import sharp from "sharp";
import multer from "multer";


async function cropImage({x, y, width, height, offsetWidth, offsetHeight}) {
    let originalImage = 'uploads/uploadedFile.jpg';

// file name for cropped image
    let outputImage = 'uploads/croppedImage.jpg';
    const metadata = await sharp(originalImage).metadata()
    const divisionOfWidth = metadata.width / offsetWidth;
    const divisionOfHeight = metadata.height / offsetHeight;

    sharp(originalImage).extract({ width: Math.floor(width * divisionOfWidth), height: Math.floor(height * divisionOfHeight) , left: Math.floor(x * divisionOfWidth), top: Math.floor(y * divisionOfHeight)}).toFile(outputImage)
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