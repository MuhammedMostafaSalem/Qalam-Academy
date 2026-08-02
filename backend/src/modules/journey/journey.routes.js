const express = require("express");

const {
    getJourney,
    updateJourney,
} = require("./journey.controller");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const uploadSingle = require("../../middlewares/uploadSingle");
const validate = require("../../middlewares/validate");

const {
    updateJourneySchema,
} = require("./journey.schema");

const parseNestedFormData = require("../../middlewares/parseNestedFormData");

const router = express.Router();

router
    .route("/")
    .get(getJourney)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "image",
            folder: "journey",
            fileType: "image",
        }),
        parseNestedFormData,
        validate(updateJourneySchema),
        updateJourney
    );

module.exports = router;