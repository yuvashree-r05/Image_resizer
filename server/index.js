const express = require("express");
const dotenv = require("dotenv");

const imageRoutes = require("./routes/imageRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/images", imageRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Image Resizer API is running successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});