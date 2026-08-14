const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const imageController = require("../controllers/imageController");

const router = express.Router();

// Test image routes
router.get("/test", (req, res) => {
    res.status(200).json({
        message: "Image routes are working"
    });
});

// Upload image
router.post(
    "/upload",
    upload.single("image"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an image"
            });
        }

        res.status(200).json({
            message: "Image uploaded successfully",
            file: req.file
        });
    }
);

// Process image
router.post(
    "/process",
    upload.single("image"),
    imageController.processImage
);

// Get processed image
router.get(
    "/processed/:filename",
    imageController.getProcessedImage
);

module.exports = router;