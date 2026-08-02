const translateDocument = require("./translateDocument");

module.exports = (
    documents,
    language,
    fields = []
) =>
    documents.map((document) =>
        translateDocument(
            document,
            language,
            fields
        )
    );