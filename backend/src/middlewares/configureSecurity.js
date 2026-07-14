const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const env = require("../config/env");

const configureSecurity = (app) => {
    app.use(helmet());
    app.use(
        cors({
            origin: env.clientUrl,
            credentials: true,
        })
    );
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
        })
    );
    app.use(mongoSanitize());
    app.use(xss());
    app.use(hpp());
    app.use(compression());
}

module.exports = configureSecurity;