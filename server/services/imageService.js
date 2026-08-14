const sharp = require("sharp");
const path = require("path");

const processImage = async (
    inputPath,
    outputPath,
    width,
    height,
    quality,
    format,
    crop
) => {
    let image = sharp(inputPath);

    // Crop
    if (crop) {
        image = image.extract({
            left: crop.left,
            top: crop.top,
            width: crop.width,
            height: crop.height
        });
    }

    // Resize
    const resizeOptions = {
        fit: "inside"
    };

    if (width) {
        resizeOptions.width = width;
    }

    if (height) {
        resizeOptions.height = height;
    }

    image = image.resize(resizeOptions);

    // Format conversion + compression
    switch (format) {
        case "jpeg":
        case "jpg":
            image = image.jpeg({
                quality
            });
            break;

        case "png":
            image = image.png({
                quality
            });
            break;

        case "webp":
            image = image.webp({
                quality
            });
            break;
    }

    // Temporary debugging logs
    console.log("Input path:", inputPath);
    console.log("Output path:", outputPath);

    await image.toFile(outputPath);

    console.log("Image processed successfully");

    return path.basename(outputPath);
};

module.exports = {
    processImage
};