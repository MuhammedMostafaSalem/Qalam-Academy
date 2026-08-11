const express = require("express");

const configureSecurity = require("./middlewares/configureSecurity");
const configureParsers = require("./middlewares/configureParsers");
const configureStaticFiles = require("./middlewares/configureStaticFiles");
const configureLogger = require("./middlewares/configureLogger");
const language = require("./middlewares/language");

const routes = require("./routes");

const errorMiddleware = require("./middlewares/errorMiddleware");
const notFound = require("./middlewares/notFound");

const app = express();

// Security
configureSecurity(app);

// Parsers
configureParsers(app);

// Static Files
configureStaticFiles(app);

// Logger
configureLogger(app);

// Language Middleware
app.use(language);

app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
});

// Routes
app.use("/api", routes);

// 404 Not Found
app.use(notFound);

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;