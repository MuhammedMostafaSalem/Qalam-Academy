const deleteFile = require("./deleteFile");
const generateFileUrl = require("./generateFileUrl");

const handleUploadedFiles = ({
    req,
    document = null,
    fileFields = [],
}) => {
    // Single File
    if (req.file && fileFields.length) {
        const field = fileFields[0];

        // Delete old file (Update)
        if (document && document[field]) {
            deleteFile(document[field]);
        }

        req.body[field] = generateFileUrl(
            req.file.fileInfo.filePath
        );
    }

    // Multiple Files
    if (req.files && fileFields.length) {
        fileFields.forEach(field => {
            if (!req.files[field]?.length) return;

            // Delete old files (Update)
            if (document && Array.isArray(document[field])) {
                document[field].forEach(file => deleteFile(file));
            }

            req.body[field] = req.files[field].map(file =>
                generateFileUrl(file.fileInfo.filePath)
            );
        });
    }

    return req.body;
}

module.exports = handleUploadedFiles;