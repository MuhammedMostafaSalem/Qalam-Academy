const express = require("express");
const {
    getSettings,
    updateSettings,
} = require("./settings.controller");
const {
    updateSettingsSchema,
} = require("./settings.schema");
const validate = require("../../middlewares/validate");
const uploadMultiple = require("../../middlewares/uploadMultiple");
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const router = express.Router();

/*
    * Public
    * GET /api/settings
*/
router.get("/", getSettings);

/*
    * Admin Only
    * PATCH /api/settings
*/
router.patch(
    "/",
    isAuthenticatedUser,
    authorizeRoles("admin"),

    uploadMultiple({
        folder: "settings",
        fileType: ["image"],
        fields: [
            {
                name: "logoDark",
                maxCount: 1,
            },
            {
                name: "logoLight",
                maxCount: 1,
            },
            {
                name: "favicon",
                maxCount: 1,
            },
        ],
    }),

    validate(updateSettingsSchema),

    updateSettings
);

module.exports = router;