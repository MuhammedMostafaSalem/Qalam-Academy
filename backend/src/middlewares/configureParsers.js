const express = require("express");
const cookieParser = require("cookie-parser");

const configureParsers = (app) => {
    // Body Parser
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    // Cookies
    app.use(cookieParser());
}

module.exports = configureParsers;