const express = require("express");
const validate = require("../../middlewares/validate");
const {
    createPageSectionSchema,
    updatePageSectionSchema
} = require("./page-section.schema");
const {
    createPageSection,
    getAllPageSections,
    getPageSection,
    updatePageSection,
    deletePageSection
} = require("./page-section.controller");
const {
    isAuthenticatedUser,
    authorizeRoles
} = require("../../middlewares/auth");

const router = express.Router();

// Public Routes

// Get All
router.get(
    "/",
    getAllPageSections
);

// Get One
router.get(
    "/:id",
    getPageSection
);

// Admin Routes

// Create
router.post(
    "/",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    validate(createPageSectionSchema),
    createPageSection
);

// Update
router.patch(
    "/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    validate(updatePageSectionSchema),
    updatePageSection
);

// Delete
router.delete(
    "/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deletePageSection
);

module.exports = router;