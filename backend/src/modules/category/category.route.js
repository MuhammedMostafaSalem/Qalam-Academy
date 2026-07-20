const express = require("express");
const {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require("./category.controller");
const {
    isAuthenticatedUser,
    authorizeRoles
} = require("../../middlewares/auth");
const uploadSingle = require("../../middlewares/uploadSingle");
const validate = require("../../middlewares/validate");
const {
    createCategorySchema,
    updateCategorySchema
} = require("./category.schema");

const router = express.Router();

router
    .route("/")
    .get(getCategories)
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "image",
            folder: "categories",
            fileType: "image",
        }),
        validate(createCategorySchema),
        createCategory
    );

router
    .route("/:id")
    .get(getCategory)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "image",
            folder: "categories",
            fileType: "image",
        }),
        validate(updateCategorySchema),
        updateCategory
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        deleteCategory
    );

module.exports = router;