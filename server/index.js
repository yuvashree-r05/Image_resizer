const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const imageRoutes = require("./routes/imageRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(express.json());

// Create required directories automatically
const uploadsDir = path.join(__dirname, "uploads");
const processedDir = path.join(__dirname, "processed");

fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(processedDir, { recursive: true });

app.use("/api/images", imageRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Image Resizer API is running successfully"
    });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});