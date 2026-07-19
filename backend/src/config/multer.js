const fs = require("fs");
const path = require("path");
const multer = require("multer");

const mime = require("mime-types");

const ApiError = require("../utils/ApiError");
const generateFileName = require("../utils/generateFileName");

const allowedMimeTypes = {
    image: [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
    ],

    video: [
        "video/mp4",
        "video/webm",
        "video/quicktime",
        "video/x-msvideo",
        "video/x-matroska",
    ],

    pdf: [
        "application/pdf",
    ],
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const folder = req.uploadFolder || "general";

        const uploadPath = path.join(
            __dirname,
            "..",
            "uploads",
            folder
        );

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },

    filename(req, file, cb) {
        const fileInfo = generateFileName(
            file.originalname,
            req.uploadFolder
        );

        file.fileInfo = fileInfo;

        cb(null, fileInfo.fileName);
    }
});

const fileFilter = (fileType) => {
    return (req, file, cb) => {
        const mimeTypes = allowedMimeTypes[fileType];

        if (!mimeTypes) {
            return cb(new ApiError("Unsupported upload type.", 400));
        }

        if (!mimeTypes.includes(file.mimetype)) {
            return cb(new ApiError("Invalid file type.", 400));
        }

        cb(null, true);
    }
}

module.exports = {
    multer,
    storage,
    fileFilter,
}