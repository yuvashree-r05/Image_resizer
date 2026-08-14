# Image Resizer API

A backend REST API for uploading, resizing, compressing, converting, and cropping images.

This project was built to practice real-world backend concepts such as file uploads, validation, image processing, error handling, temporary file cleanup, and REST API testing.

---

##  Features

- Upload images
- Accept JPEG, PNG, and WebP images
- Maximum file size of 5 MB
- Resize images using width and/or height
- Compress images using configurable quality
- Convert images between JPEG, PNG, and WebP
- Crop images using custom dimensions and coordinates
- Validate image dimensions and quality values
- Automatically delete temporary uploaded files after processing
- Retrieve processed images
- Centralized error handling
- Tested using Bruno

---

## Tech Stack

- Node.js
- Express.js
- Multer
- Sharp
- JavaScript
- Bruno

---

##  Project Structure

```text
image_resizer/
│
├── server/
│   ├── controllers/
│   │   └── imageController.js
│   │
│   ├── middleware/
│   │   ├── errorMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── routes/
│   │   └── imageRoutes.js
│   │
│   ├── services/
│   │   └── imageService.js
│   │
│   ├── uploads/
│   │
│   ├── processed/
│   │
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── screenshots/
│   ├── server-running.png
│   ├── image-upload.png
│   ├── image-resize.png
│   ├── format-conversion.png
│   ├── image-crop.png
│   ├── error-handling.png
│   └── processed-image.png
│
├── .gitignore
└── README.md