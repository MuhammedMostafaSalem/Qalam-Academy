module.exports = (value, language = "ar") => {
    if (value == null) return value;

    if (typeof value !== "object") {
        return value;
    }

    const val = value[language];
    if (typeof val === "string" && val.trim() !== "") {
        return val;
    }

    const altLang = language === "ar" ? "en" : "ar";
    const altVal = value[altLang];
    if (typeof altVal === "string" && altVal.trim() !== "") {
        return altVal;
    }

    if (val !== undefined && val !== null) return String(val);
    if (altVal !== undefined && altVal !== null) return String(altVal);

    return "";
};