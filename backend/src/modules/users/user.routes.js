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
    changePassword,
    getThemeMode,
    toggleThemeMode,
    getCurrentUser,
    updateUserByAdmin,
    getAllUsersByAdmin
} = require("./user.controller");
const uploadSingle = require("../../middlewares/uploadSingle");
const validate = require("../../middlewares/validate");
const { updateUserSchema } = require("./validators/user.schema");
const { changePasswordSchema } = require("./validators/changePassword.schema");
const { updateUserAdminSchema } = require("./validators/adminUser.schema");
const { updateThemeModeSchema } = require("./validators/theme.schema");

const router = express.Router();

// theme mode
router.get(
    "/theme",
    isAuthenticatedUser,
    getThemeMode
);

router.patch(
    "/theme/toggle",
    isAuthenticatedUser,
    validate(updateThemeModeSchema),
    toggleThemeMode
);

// get current user
router
    .route("/me")
    .get(
        isAuthenticatedUser,
        getCurrentUser
    )

// Get all users
router
    .route("/")
    .get(
        isAuthenticatedUser,
        getUsers
    )


router
    .route("/admin")
    .get(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        getAllUsersByAdmin
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

// Update user by admin
router.patch(
    "/:id/admin",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    // validate(updateUserAdminSchema),
    updateUserByAdmin
);

module.exports = router;
