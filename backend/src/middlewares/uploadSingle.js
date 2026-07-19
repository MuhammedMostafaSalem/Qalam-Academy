const {
    multer,
    storage,
    fileFilter,
} = require("../config/multer");

const uploadSingle = ({
    fieldName,
    folder,
    fileType,
    maxSize = 20 * 1024 * 1024,
}) => {
    return (req, res, next) => {
        req.uploadFolder = folder;

        multer({
            storage,
            fileFilter: fileFilter(fileType),
            limits: {
                fileSize: maxSize,
            },
        }).single(fieldName)(req, res, next);
    };
};

module.exports = uploadSingle;