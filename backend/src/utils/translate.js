module.exports = (value, language = "ar") => {
    if (value == null) return value;

    if (typeof value !== "object") {
        return value;
    }

    return (
        value[language] ??
        value.ar ??
        value.en ??
        ""
    );
};