import sharp from "sharp";

async function cropImage({x, y, width, height, offsetWidth, offsetHeight, filename}) {
    let originalImage = `uploads/${filename}`;
    let outputImage = `uploads/cropped${filename}`;
    
    try {
        const metadata = await sharp(originalImage).metadata();
        let divisionOfWidth = metadata.width / offsetWidth;
        let divisionOfHeight = metadata.height / offsetHeight;

        if ((offsetWidth - offsetHeight) * (metadata.width - metadata.height) < 0) {
            divisionOfHeight = metadata.height / offsetWidth;
            divisionOfWidth = metadata.width / offsetHeight;

            sharp(originalImage).rotate(90).extract({ width: Math.round(width * divisionOfWidth) , height: Math.round(height * divisionOfHeight) , left: Math.round(x * divisionOfWidth), top: Math.round(y * divisionOfHeight)}).toFile(outputImage)
            .then(function(new_file_info) {
                console.log("rotated,cropped and saved");
            })
            .catch(function(err) {
                console.log("An error occured",err);
        });
        } else {
            sharp(originalImage).extract({ width: Math.round(width * divisionOfWidth), height: Math.round(height * divisionOfHeight) , left: Math.round(x * divisionOfWidth), top: Math.round(y * divisionOfHeight)}).toFile(outputImage)
            .then(function(new_file_info) {
                console.log("Image cropped and saved");
            })
            .catch(function(err) {
                console.log("An error occured",err);
            });
        }
    } catch(error) {
        return new Error(`An error occurred during processing: ${error}`);
  }
}

export default {
    cropImage
}
