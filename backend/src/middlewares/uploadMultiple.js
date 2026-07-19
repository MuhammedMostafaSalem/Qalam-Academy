const {
    storage,
    fileFilter,
    multer,
} = require("../config/multer");

const uploadMultiple = ({
    fields,
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
        }).fields(fields)(req, res, next);
    };
};

module.exports = uploadMultiple;