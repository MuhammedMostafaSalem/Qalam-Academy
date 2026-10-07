const translate = require("../../utils/translate");

const clone = (data) => {
    if (data === undefined || data === null) {
        return data;
    }

    try {
        return JSON.parse(JSON.stringify(data));
    } catch {
        return data;
    }
};

const translatePageSection = (
    document,
    language
) => {
    if (!document) {
        return document;
    }

    const rawDocument =
        typeof document.toObject === "function"
            ? document.toObject()
            : document;

    const documentData = clone(rawDocument);

    /*
     * ----------------------------------------
     * Top-level content translations
     * ----------------------------------------
     */

    const content = documentData.content || {};

    const translations = {
        badge: clone(content.badge),
        title: clone(content.title),
        description: clone(content.description),
        items: [],
    };

    documentData.content = {
        badge: translate(
            content.badge,
            language
        ),

        title: translate(
            content.title,
            language
        ),

        description: translate(
            content.description,
            language
        ),
    };

    /*
     * ----------------------------------------
     * Items translations
     * ----------------------------------------
     */

    const items = Array.isArray(documentData.items)
        ? documentData.items
        : [];

    translations.items = items.map((item) => {
        const itemContent =
            item?.content || {};

        return {
            _id: item?._id || null,

            title: clone(
                itemContent.title
            ),

            description: clone(
                itemContent.description
            ),
        };
    });

    /*
     * Translate items for current language
     */

    documentData.items = items.map((item) => {
        const itemContent =
            item?.content || {};

        return {
            ...item,

            content: {
                title: translate(
                    itemContent.title,
                    language
                ),

                description: translate(
                    itemContent.description,
                    language
                ),
            },
        };
    });

    /*
     * ----------------------------------------
     * Final response
     * ----------------------------------------
     */

    documentData._translations =
        translations;

    return documentData;
};

const translatePageSections = (
    documents,
    language
) => {
    if (!Array.isArray(documents)) {
        return [];
    }

    return documents.map((document) =>
        translatePageSection(
            document,
            language
        )
    );
};

module.exports = {
    translatePageSection,
    translatePageSections,
};