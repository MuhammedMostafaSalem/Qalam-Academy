const express = require("express");

const {
    createTimeline,
    getTimelines,
    getTimeline,
    updateTimeline,
    deleteTimeline,
} = require("./timeline.controller");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const validate = require("../../middlewares/validate");

const {
    createTimelineSchema,
    updateTimelineSchema,
} = require("./timeline.schema");

const parseNestedFormData = require("../../middlewares/parseNestedFormData");

const router = express.Router();

router
    .route("/")
    .get(getTimelines)
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        parseNestedFormData,
        validate(createTimelineSchema),
        createTimeline
    );

router
    .route("/:id")
    .get(getTimeline)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        parseNestedFormData,
        validate(updateTimelineSchema),
        updateTimeline
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        deleteTimeline
    );

module.exports = router;