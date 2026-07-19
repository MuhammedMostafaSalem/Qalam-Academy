const fs = require("fs");
const path = require("path");

const deleteFile = async (fileUrl) => {
    if (!fileUrl) return;

    try {
        // 1. If the path is a full URL, we will extract the part that comes after `/uploads/`.
        let relativePath = fileUrl;
        if (fileUrl.includes("/uploads/")) {
            relativePath = fileUrl.split("/uploads/")[1];
        }

        // 2. Link the `relativePath` to the actual location of the `uploads` folder on the server.
        // Note: Since this file is likely located inside `src/utils`, we will go back one level to `src` and then enter `uploads`.
        const fullPath = path.join(__dirname, "..", "uploads", relativePath);

        // 3. Make sure the existence of the file and delete it.
        if (fs.existsSync(fullPath)) {
            await fs.promises.unlink(fullPath);
            console.log(`Successfully deleted old file: ${relativePath}`.green);
        } else {
            console.log(`File not found at path: ${fullPath}`.yellow);
        }
    } catch (error) {
        console.error("Failed to delete file:", error.message);
    }
}

module.exports = deleteFile;