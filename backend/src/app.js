const express = require("express");

const configureSecurity = require("./middlewares/configureSecurity");
const configureParsers = require("./middlewares/configureParsers");
const configureStaticFiles = require("./middlewares/configureStaticFiles");
const configureLogger = require("./middlewares/configureLogger");

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

// Routes
app.use("/api", routes);

// 404 Not Found
app.use(notFound);

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;