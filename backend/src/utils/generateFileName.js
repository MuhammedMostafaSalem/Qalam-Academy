const path = require("path");
const { v4: uuidv4 } = require("uuid");
const slugify = require("slugify");

const generateFileName = (originalName, folder = "general") => {
    // Extract file extension
    const extension = path.extname(originalName).toLowerCase();

    // Remove extension
    const fileName = path.basename(originalName, extension);

    // Generate slug
    const slug = slugify(fileName, {
        lower: true,
        strict: true,
        trim: true,
    });

    // Generate unique file name
    const uniqueName = `${uuidv4()}-${slug}${extension}`;

    return {
        folder,
        fileName: uniqueName,
        filePath: `${folder}/${uniqueName}`,
    };
}

module.exports = generateFileName;