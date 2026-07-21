const express = require("express");
const {
    isAuthenticatedUser,
    authorizeRoles
} = require("../../middlewares/auth");
const {
    getUsers,
    updateUser,
    deleteUser,
    getUser
} = require("./user.controller");
const uploadSingle = require("../../middlewares/uploadSingle");
const validate = require("../../middlewares/validate");
const { updateUserSchema } = require("./user.schema");

const router = express.Router();

// Get all users
router
    .route("/")
    .get(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        getUsers
    );

// Get one user
// Update user
// Delete user
router
    .route("/:id")
    .get(
        isAuthenticatedUser,
        getUser
    )
    .patch(
        isAuthenticatedUser,
        uploadSingle({
            fieldName: "avatar",
            folder: "users",
            fileType: "image",
        }),
        validate(updateUserSchema),
        updateUser
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        deleteUser
    );

module.exports = router;