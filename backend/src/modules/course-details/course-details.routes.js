const express = require("express");

const {
    getCourseDetails,
} = require("./course-details.controller");

const {
    optionalAuth,
} = require("../../middlewares/auth");

const router = express.Router();

router.get(
    "/:slug/details",
    optionalAuth,
    getCourseDetails
);

module.exports = router;