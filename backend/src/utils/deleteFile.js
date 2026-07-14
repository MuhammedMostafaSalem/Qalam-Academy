const fs = require("fs");
const path = require("path");

const deleteFile = async (filePath) => {
    if (!filePath) return;

    try {
        const fullPath = path.resolve(filePath);

        if (fs.existsSync(fullPath)) {
            await fs.promises.unlink(fullPath);
        }
    } catch (error) {
        console.error("Failed to delete file:", error.message);
    }
};

module.exports = deleteFile;