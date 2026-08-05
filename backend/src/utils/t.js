const ar = require("../locales/ar");
const en = require("../locales/en");

const locales = { ar, en };

module.exports = (lang, key, params = {}) => {
    const keys = key.split(".");

    let value = locales[lang];

    for (const k of keys) {
        value = value?.[k];
    }

    if (!value) return key;

    return Object.entries(params).reduce((text, [key, value]) => {
        return text.replaceAll(`{{${key}}}`, String(value));
    }, value);
};