module.exports = (req, res, next) => {
    const parsed = {};

    for (const key in req.body) {
        if (!key.includes(".")) {
            parsed[key] = req.body[key];
            continue;
        }

        const keys = key.split(".");

        let current = parsed;

        while (keys.length > 1) {
            const k = keys.shift();

            if (!current[k]) {
                current[k] = {};
            }

            current = current[k];
        }

        current[keys[0]] = req.body[key];
    }

    req.body = parsed;

    next();
};