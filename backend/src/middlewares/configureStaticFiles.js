const path = require("path");
const express = require("express");

const configureStaticFiles = (app) => {
    app.use(
        "/uploads",
        express.static(path.join(__dirname, "..", "uploads"))
    );
}

module.exports = configureStaticFiles;