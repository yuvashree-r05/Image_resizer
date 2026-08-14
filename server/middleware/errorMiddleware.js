const multer = require("multer");

const errorMiddleware = (err, req, res, next) => {
    console.error(err.message);

    // Multer errors
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "File size must not exceed 5 MB"
            });
        }

        return res.status(400).json({
            message: err.message
        });
    }

    // Invalid image type
    if (err.message === "Only JPEG, PNG and WebP images are allowed") {
        return res.status(400).json({
            message: err.message
        });
    }

    // Errors with a specific status code
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    // Default server error
    res.status(500).json({
        message: "Something went wrong"
    });
};

module.exports = errorMiddleware;