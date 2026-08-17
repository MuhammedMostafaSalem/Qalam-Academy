const express = require("express");
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");
const uploadSingle = require("../../middlewares/uploadSingle");
const validate = require("../../middlewares/validate");
const parseNestedFormData = require("../../middlewares/parseNestedFormData");
const {
    getBlogs,
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog,
} = require("./blog.controller");
const {
    createBlogSchema,
    updateBlogSchema,
} = require("./blog.schema");

const router = express.Router();

router
    .route("/")
    .get(getBlogs)
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "featuredImage",
            folder: "blogs",
            fileType: "image",
        }),
        parseNestedFormData,
        validate(createBlogSchema),
        createBlog
    );

router
    .route("/:id")
    .get(getBlog)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "featuredImage",
            folder: "blogs",
            fileType: "image",
        }),
        parseNestedFormData,
        validate(updateBlogSchema),
        updateBlog
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        deleteBlog
    );

module.exports = router;