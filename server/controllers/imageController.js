const path = require("path");
const fs = require("fs");
const imageService = require("../services/imageService");

const processImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an image"
            });
        }

        const { width, height, quality, format, crop } = req.body;

        // At least width or height is required
        if (!width && !height) {
            return res.status(400).json({
                message: "Width or height is required"
            });
        }

        const parsedWidth = width ? Number(width) : null;
        const parsedHeight = height ? Number(height) : null;

        // Validate width and height
        if (
            (parsedWidth !== null &&
                (!Number.isInteger(parsedWidth) || parsedWidth <= 0)) ||
            (parsedHeight !== null &&
                (!Number.isInteger(parsedHeight) || parsedHeight <= 0))
        ) {
            return res.status(400).json({
                message: "Width and height must be positive integers"
            });
        }

        // Quality is optional
        const parsedQuality = quality ? Number(quality) : 80;

        if (
            !Number.isInteger(parsedQuality) ||
            parsedQuality < 1 ||
            parsedQuality > 100
        ) {
            return res.status(400).json({
                message: "Quality must be an integer between 1 and 100"
            });
        }

        // Format is optional
        const selectedFormat = format
            ? format.toLowerCase()
            : "jpeg";

        const allowedFormats = ["jpeg", "jpg", "png", "webp"];

        if (!allowedFormats.includes(selectedFormat)) {
            return res.status(400).json({
                message: "Format must be jpeg, png or webp"
            });
        }

        // Crop is optional
        let cropOptions = null;

        if (crop) {
            try {
                cropOptions =
                    typeof crop === "string"
                        ? JSON.parse(crop)
                        : crop;
            } catch (error) {
                return res.status(400).json({
                    message: "Crop must be valid JSON"
                });
            }

            const {
                width: cropWidth,
                height: cropHeight,
                left,
                top
            } = cropOptions;

            if (
                !Number.isInteger(Number(cropWidth)) ||
                !Number.isInteger(Number(cropHeight)) ||
                !Number.isInteger(Number(left)) ||
                !Number.isInteger(Number(top)) ||
                Number(cropWidth) <= 0 ||
                Number(cropHeight) <= 0 ||
                Number(left) < 0 ||
                Number(top) < 0
            ) {
                return res.status(400).json({
                    message:
                        "Crop width and height must be positive integers, and left/top cannot be negative"
                });
            }

            cropOptions.width = Number(cropWidth);
            cropOptions.height = Number(cropHeight);
            cropOptions.left = Number(left);
            cropOptions.top = Number(top);
        }

        // Convert jpg to jpeg for Sharp
        const extension =
            selectedFormat === "jpg"
                ? "jpeg"
                : selectedFormat;

        const originalName = path.parse(req.file.filename).name;

        const outputFilename =
            `processed-${Date.now()}-${originalName}.${extension}`;

        const outputPath = path.join(
            "processed",
            outputFilename
        );

        const filename = await imageService.processImage(
            req.file.path,
            outputPath,
            parsedWidth,
            parsedHeight,
            parsedQuality,
            selectedFormat,
            cropOptions
        );

        // Delete temporary uploaded file
        fs.unlink(req.file.path, (error) => {
            if (error) {
                console.error(
                    "Failed to delete uploaded file:",
                    error.message
                );
            } else {
                console.log(
                    "Uploaded file deleted successfully"
                );
            }
        });

        res.status(200).json({
            message: "Image processed successfully",
            filename,
            format: extension,
            quality: parsedQuality
        });
    } catch (error) {
        next(error);
    }
};

// Get processed image
const getProcessedImage = (req, res, next) => {
    try {
        const { filename } = req.params;

        if (!filename) {
            return res.status(400).json({
                message: "Filename is required"
            });
        }

        const filePath = path.join(
            __dirname,
            "../processed",
            filename
        );

        res.sendFile(filePath, (error) => {
            if (error && !res.headersSent) {
                return res.status(404).json({
                    message: "Processed image not found"
                });
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    processImage,
    getProcessedImage
};