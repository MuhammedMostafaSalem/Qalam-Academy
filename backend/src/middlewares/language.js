const {
    SUPPORTED_LANGUAGES,
    DEFAULT_LANGUAGE,
} = require("../config/languages");
const t = require("../utils/t")

module.exports = (req, res, next) => {
    let rawLang =
        req.headers["accept-language"] ||
        req.headers["Accept-language"] ||
        req.cookies?.NEXT_LOCALE ||
        req.cookies?.NEXT_LANG ||
        req.query.lang ||
        DEFAULT_LANGUAGE;

    if (typeof rawLang === "string") {
        if (rawLang.includes(",")) {
            rawLang = rawLang.split(",")[0];
        }
        if (rawLang.includes(";")) {
            rawLang = rawLang.split(";")[0];
        }
        if (rawLang.includes("-")) {
            rawLang = rawLang.split("-")[0];
        }
    }

    let lang = String(rawLang || DEFAULT_LANGUAGE).toLowerCase().trim();

    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        lang = DEFAULT_LANGUAGE;
    }

    req.language = lang;
    req.t = (key, params = {}) => t(lang, key, params);

    next();
};