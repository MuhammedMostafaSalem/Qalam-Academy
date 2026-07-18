const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");

const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = {};

            result.error.issues.forEach(issue => {
                const field = issue.path.length
                    ? issue.path.join(".")
                    : "_root";

                if (!errors[field]) {
                    errors[field] = [];
                }

                errors[field].push(issue.message);
            });

            return next(new ApiError("Validation failed", StatusCodes.BAD_REQUEST, errors));
        }

        // Replace req.body with the parsed data
        req.body = result.data;

        next();
    }
}

module.exports = validate;