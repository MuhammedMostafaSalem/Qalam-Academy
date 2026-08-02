const translate = require("./translate");

const translateDocument = (
    document,
    language,
    fields = []
) => {
    if (!document) return document;

    const obj =
        typeof document.toObject === "function"
            ? document.toObject()
            : { ...document };

    // fields.forEach((field) => {
    //     if (obj[field]) {
    //         obj[field] = translate(obj[field], language);
    //     }
    // });
    fields.forEach((field) => {
        if (field.includes(".")) {
            const keys = field.split(".");

            let current = obj;

            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) return;
                current = current[keys[i]];
            }

            const lastKey = keys[keys.length - 1];

            if (current[lastKey]) {
                current[lastKey] = translate(
                    current[lastKey],
                    language
                );
            }
        } if (obj[field]) {
            obj[field] = translate(
                obj[field],
                language
            );
        }
    });

    return obj;
};

module.exports = translateDocument;