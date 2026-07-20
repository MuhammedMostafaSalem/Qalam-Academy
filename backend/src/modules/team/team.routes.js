const express = require("express");
const {
    isAuthenticatedUser,
    authorizeRoles
} = require("../../middlewares/auth");
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
        validate(createTeamSchema),
        createTeam
    );

router
    .route("/:id")
    .get(getTeam)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        validate(updateTeamSchema),
        updateTeam
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        deleteTeam
    );

module.exports = router;