# Image Resizer API

A backend REST API for uploading, resizing, compressing, converting, and cropping images.

This project was built to practice real-world backend concepts such as file uploads, validation, image processing, error handling, temporary file cleanup, and REST API testing.

---

## Features

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

## Project Structure

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
│   ├── error-handling.png
│   ├── image_resize.png
│   ├── image-retrieved.png
│   ├── image-routes.png
│   ├── images-upload.png
│   └── server-running.png
│
├── .gitignore
└── README.md
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yuvashree-r05/Image_resizer.git
```

### 2. Move into the Server Directory

```bash
cd Image_resizer/server
```

### 3. Install Dependencies

```bash
npm install
```

---

## Running the Server

Start the server using:

```bash
node index.js
```

The server will run on:

```text
http://localhost:5000
```

---

# API Endpoints

## 1. Server Test

### GET

```text
/
```

### Response

```json
{
  "message": "Image Resizer API is running successfully"
}
```

---

## 2. Image Routes Test

### GET

```text
/api/images/test
```

### Response

```json
{
  "message": "Image routes are working"
}
```

---

## 3. Upload Image

### POST

```text
/api/images/upload
```

Use:

```text
multipart/form-data
```

### Request Field

```text
image
```

### Supported Formats

- JPEG
- PNG
- WebP

### Maximum File Size

```text
5 MB
```

---

## 4. Process Image

### POST

```text
/api/images/process
```

Use:

```text
multipart/form-data
```

### Request Fields

| Field | Required | Description |
|---|---|---|
| image | Yes | Image to process |
| width | Yes* | Target width |
| height | Yes* | Target height |
| quality | No | Image quality from 1–100 |
| format | No | jpeg, png, or webp |
| crop | No | Crop configuration |

> *At least `width` or `height` is required.*

### Example Request

```text
image   → example.jpg
width   → 800
height  → 600
quality → 80
format  → webp
```

### Crop Example

```json
{
  "width": 500,
  "height": 400,
  "left": 0,
  "top": 0
}
```

### Example Response

```json
{
  "message": "Image processed successfully",
  "filename": "processed-123456-example.webp",
  "format": "webp",
  "quality": 80
}
```

The processed image is stored in:

```text
server/processed/
```

---

## 5. Get Processed Image

### GET

```text
/api/images/processed/:filename
```

Replace `:filename` with the filename returned by the processing endpoint.

### Example

```text
/api/images/processed/processed-123456-example.webp
```

The API returns the processed image.

If the image does not exist:

```json
{
  "message": "Processed image not found"
}
```

---

# Validation and Error Handling

The API validates:

- Missing image
- Unsupported file types
- Files larger than 5 MB
- Invalid width
- Invalid height
- Invalid quality
- Invalid format
- Invalid crop JSON
- Invalid crop dimensions
- Missing processed files

### Example Error Response

```json
{
  "message": "Width and height must be positive integers"
}
```

---

# File Cleanup

Uploaded images are temporarily stored in:

```text
server/uploads/
```

After successful processing, the original uploaded file is automatically deleted.

The final processed image is stored in:

```text
server/processed/
```

This prevents unnecessary temporary files from remaining on the server.

---

# Testing

The API was tested using Bruno.

The following functionality was tested:

- Server availability
- Image route availability
- Image upload
- Image resizing
- Image compression
- Format conversion
- Image cropping
- Invalid dimensions
- Unsupported file types
- File size validation
- Processed image retrieval
- Temporary file cleanup

---

# API Testing Screenshots

## Server Running

![Server Running](screenshots/server-running.png)

---

## Image Routes

![Image Routes](screenshots/image-routes.png)

---

## Image Upload

![Image Upload](screenshots/images-upload.png)

---

## Image Processing

The `/api/images/process` endpoint demonstrates resizing, compression, format conversion, and cropping.

![Image Processing](screenshots/image_resize.png)

---

## Error Handling

![Error Handling](screenshots/error-handling.png)

---

## Processed Image Retrieval

![Processed Image](screenshots/image-retrieved.png)

---

# Image Processing Flow

```text
Client
   │
   │ Upload Image
   ▼
Multer
   │
   │ Validate File
   ▼
uploads/
   │
   │ Process
   ▼
Sharp
   │
   ├── Resize
   ├── Compress
   ├── Convert Format
   └── Crop
   │
   ▼
processed/
   │
   └── Final Image
   │
   ▼
Temporary Original Deleted
```

---

# Security Considerations

The API includes basic file-handling protections:

- Restricts uploaded image types
- Limits file size to 5 MB
- Generates server-side filenames
- Does not use the original filename directly for storage
- Deletes temporary uploaded files after successful processing
- Handles invalid requests through centralized error middleware

Authentication and a database are not required for the current version because the API does not maintain user accounts or user-specific data.

---

# Future Improvements

Possible future improvements include:

- User authentication
- Cloud storage
- Automatic deletion of old processed images
- Rate limiting
- Swagger/OpenAPI documentation
- Batch image processing
- Frontend interface
- Nginx reverse proxy
- Docker containerization
- Cloud deployment

---

# Author

Yuvashree

---

## License

This project was created for learning and development purposes.