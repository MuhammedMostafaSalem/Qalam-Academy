const env = require("../config/env");

const generateFileUrl = (filePath = "") => {
    if (!filePath) return null;

    // إذا كان URL كامل بالفعل (Cloudinary - S3 ...)
    if (
        filePath.startsWith("http://") ||
        filePath.startsWith("https://")
    ) {
        return filePath;
    }

    const baseUrl = env.baseUrl;

    return `${baseUrl}/uploads/${filePath.replace(/^\/+/, "")}`;
}

module.exports = generateFileUrl;