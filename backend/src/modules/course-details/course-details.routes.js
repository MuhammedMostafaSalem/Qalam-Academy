const express = require("express");

const {
    getCourseDetails,
} = require("./course-details.controller");

const {
    isAuthenticatedUser,
} = require("../../middlewares/auth");

const router = express.Router();

router.get(
    "/:slug/details",
    isAuthenticatedUser,
    getCourseDetails
);

module.exports = router;