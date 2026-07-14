const morgan = require("morgan");
const env = require("../config/env");

const configureLogger = (app) => {
    if (env.nodeEnv === "development") {
        app.use(morgan("dev"));
    }
}

module.exports = configureLogger;