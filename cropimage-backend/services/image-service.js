import sharp from "sharp";
import { ValidationError, DatabaseError, ProcessError } from "../errors/error-handler.js";

async function cropImage({
  x, y, width, height, offsetWidth, offsetHeight, filename,
}) {
  const originalImage = `uploads/${filename}`;
  const outputImage = `uploads/cropped${filename}`;

  if (!offsetWidth || !offsetHeight) {
    throw new ValidationError().toJSON();
  }
  if (!originalImage) {
    throw new DatabaseError().toJSON();
  }

  try {
    const metadata = await sharp(originalImage).metadata();
    let divisionOfWidth = metadata.width / offsetWidth;
    let divisionOfHeight = metadata.height / offsetHeight;

    if ((offsetWidth - offsetHeight) * (metadata.width - metadata.height) < 0) {
      divisionOfHeight = metadata.height / offsetWidth;
      divisionOfWidth = metadata.width / offsetHeight;

      sharp(originalImage).rotate(90).extract({
        width: Math.round(width * divisionOfWidth),
        height: Math.round(height * divisionOfHeight),
        left: Math.round(x * divisionOfWidth),
        top: Math.round(y * divisionOfHeight),
      }).toFile(outputImage)
        .then(() => {
          console.log("rotated,cropped and saved");
        })
        .catch((err) => {
          console.log("An error occured", err);
        });
    } else {
      sharp(originalImage).extract({
        width: Math.round(width * divisionOfWidth),
        height: Math.round(height * divisionOfHeight),
        left: Math.round(x * divisionOfWidth),
        top: Math.round(y * divisionOfHeight),
      }).toFile(outputImage)
        .then(() => {
          console.log("Image cropped and saved");
        })
        .catch((err) => {
          console.log("An error occured", err);
        });
    }
  } catch (error) {
    throw new ProcessError(402, `An error occurred during processing: ${error.message}`).toJSON();
  }
}

export default {
  cropImage
};
