const express = require("express");
const {
    isAuthenticatedUser,
    authorizeRoles
} = require("../../middlewares/auth");
const {
    getUsers,
    updateUser,
    deleteUser,
    getUser,
    changePassword
} = require("./user.controller");
const uploadSingle = require("../../middlewares/uploadSingle");
const validate = require("../../middlewares/validate");
const { updateUserSchema } = require("./validators/user.schema");
const { changePasswordSchema } = require("./validators/changePassword.schema");

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

// Update user password
router
    .route("/:id/change-password")
    .put(
        isAuthenticatedUser,
        validate(changePasswordSchema),
        changePassword
    )

module.exports = router;