const winston = require("winston");
const env = require("./env");

const { combine, timestamp, colorize, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return stack
        ? `${timestamp} ${level}: ${stack}`
        : `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
    // level: "info",
    level: env.nodeEnv === "development"
        ? "debug"
        : "info",

    format: combine(
        errors({ stack: true }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),

    transports: [
        new winston.transports.Console({
            format: combine(
                colorize(),
                errors({ stack: true }),
                timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                logFormat
            ),
        }),
    ],
});

module.exports = logger;