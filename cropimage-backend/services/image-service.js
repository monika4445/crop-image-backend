import sharp from "sharp";

async function cropImage({x, y, width, height, offsetWidth, offsetHeight}) {
    let originalImage = 'uploads/uploadedFile.jpg';
    let outputImage = 'uploads/croppedImage.jpg';
    try {
        const metadata = await sharp(originalImage).metadata();
        } catch(error) {
    console.log(`An error occurred during processing: ${error}`);
  }
    const divisionOfWidth = metadata.width / offsetWidth;
    const divisionOfHeight = metadata.height / offsetHeight;

    sharp(originalImage).extract({ width: Math.round(width * divisionOfWidth), height: Math.round(height * divisionOfHeight) , left: Math.round(x * divisionOfWidth), top: Math.round(y * divisionOfHeight)}).toFile(outputImage)
        .then(function(new_file_info) {
            console.log("Image cropped and saved");
        })
        .catch(function(err) {
            console.log("An error occured",err);
    });
}

export default {
    cropImage
}
