const translate = require("./translate");

const isBilingualObject = (val) => {
    if (!val || typeof val !== "object" || Array.isArray(val) || val instanceof Date) return false;
    const keys = Object.keys(val);
    if (keys.length === 0) return false;
    const hasAr = "ar" in val;
    const hasEn = "en" in val;
    return (hasAr || hasEn) && keys.every((k) => ["ar", "en", "_id", "id"].includes(k));
};

const deepTranslateBilingualLeaves = (target, language) => {
    if (!target || typeof target !== "object") return target;
    if (Array.isArray(target)) {
        return target.map((item) => deepTranslateBilingualLeaves(item, language));
    }
    if (target instanceof Date) return target;

    for (const key of Object.keys(target)) {
        if (key === "_translations") continue;
        const val = target[key];
        if (isBilingualObject(val)) {
            target[key] = translate(val, language);
        } else if (val && typeof val === "object") {
            deepTranslateBilingualLeaves(val, language);
        }
    }
    return target;
};

const deepClone = (data) => {
    try {
        return JSON.parse(JSON.stringify(data));
    } catch {
        return { ...data };
    }
};

const translateDocument = (
    document,
    language,
    fields = []
) => {
    if (!document) return document;

    const rawObj =
        typeof document.toObject === "function"
            ? document.toObject()
            : document;

    const obj = deepClone(rawObj);

    fields.forEach((field) => {
        if (field.includes(".")) {
            const keys = field.split(".");

            const traverseAndTranslate = (curr, keyIdx) => {
                if (!curr) return;

                if (Array.isArray(curr)) {
                    curr.forEach((item) => traverseAndTranslate(item, keyIdx));
                    return;
                }

                if (typeof curr !== "object") return;

                const currentKey = keys[keyIdx];

                if (keyIdx === keys.length - 1) {
                    if (curr[currentKey] !== undefined) {
                        if (!obj._translations) obj._translations = {};
                        if (!obj._translations[currentKey]) {
                            obj._translations[currentKey] =
                                typeof curr[currentKey] === "object" && curr[currentKey] !== null
                                    ? { ...curr[currentKey] }
                                    : curr[currentKey];
                        }
                        curr[currentKey] = translate(
                            curr[currentKey],
                            language
                        );
                    }
                } else if (curr[currentKey] !== undefined) {
                    traverseAndTranslate(curr[currentKey], keyIdx + 1);
                }
            };

            traverseAndTranslate(obj, 0);
        } else if (obj[field] !== undefined) {
            if (!obj._translations) obj._translations = {};
            obj._translations[field] =
                typeof obj[field] === "object" && obj[field] !== null
                    ? { ...obj[field] }
                    : obj[field];
            obj[field] = translate(
                obj[field],
                language
            );
        }
    });

    // Deep auto-translate any remaining bilingual leaf objects that were not explicitly listed in fields
    deepTranslateBilingualLeaves(obj, language);

    return obj;
};

module.exports = translateDocument;