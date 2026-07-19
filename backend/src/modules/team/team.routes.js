const express = require("express");
const {
    isAuthenticatedUser,
    authorizeRoles
} = require("../../middlewares/auth");
const uploadSingle = require("../../middlewares/uploadSingle");
const validate = require("../../middlewares/validate");
const { createTeam, getTeams, getTeam, updateTeam, deleteTeam } = require("./team.controller");
const { createTeamSchema, updateTeamSchema } = require("./team.schema");

const router = express.Router();

router
    .route("/")
    .get(getTeams)
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "image",
            folder: "services",
            fileType: "image",
        }),
        validate(createTeamSchema),
        createTeam
    );

router
    .route("/:id")
    .get(getTeam)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "image",
            folder: "services",
            fileType: "image",
        }),
        validate(updateTeamSchema),
        updateTeam
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        deleteTeam
    );

module.exports = router;