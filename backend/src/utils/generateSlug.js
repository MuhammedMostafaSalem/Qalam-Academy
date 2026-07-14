const slugify = require("slugify");

const generateSlug = (value) => {
    // String
    if (typeof value === "string") {
        return slugify(value, {
            lower: true,
            strict: true,
            trim: true,
        });

        // Multi Language Object
        if (typeof value === "object" && value !== null) {
            const result = {};

            Object.keys(value).forEach(key => {
                result[key] = slugify(value[key] || "", {
                    lower: true,
                    strict: true,
                    trim: true,
                });
            });

            return result;
        }

        return "";
    }
}

module.exports = generateSlug;