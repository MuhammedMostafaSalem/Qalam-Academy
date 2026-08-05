const {
    SUPPORTED_LANGUAGES,
    DEFAULT_LANGUAGE,
} = require("../config/languages");
const t = require("../utils/t")

module.exports = (req, res, next) => {
    let lang =
        req.headers["accept-language"] ||
        req.headers["Accept-language"] ||
        req.query.lang ||
        DEFAULT_LANGUAGE;

    if (lang.includes(",")) {
        lang = lang.split(",")[0];
    }

    lang = lang.toLowerCase().trim();

    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        lang = DEFAULT_LANGUAGE;
    }

    req.language = lang;
    req.t = (key, params = {}) => t(lang, key, params);

    next();
};