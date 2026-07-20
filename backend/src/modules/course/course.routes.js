const express = require("express");
const {
    createCourse,
    getCourses,
    deleteCourse,
    updateCourse,
    getCourse
} = require("./course.controller");
const {
    createCourseSchema,
    updateCourseSchema
} = require("./course.schema");
const uploadMultiple = require("../../middlewares/uploadMultiple");
const {
    authorizeRoles,
    isAuthenticatedUser
} = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");

const router = express.Router();

router
    .route("/")
    .get(getCourses)
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin", "instructor"),

        uploadMultiple({
            folder: "courses",
            fileType: ["image", "video"],
            fields: [
                {
                    name: "thumbnail",
                    maxCount: 1,
                },
                {
                    name: "trailerVideo",
                    maxCount: 1,
                },
            ],
        }),

        validate(createCourseSchema),

        createCourse
    );

router
    .route("/:id")
    .get(getCourse)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin", "instructor"),

        uploadMultiple({
            folder: "courses",
            fileType: ["image", "video"],
            fields: [
                {
                    name: "thumbnail",
                    maxCount: 1,
                },
                {
                    name: "trailerVideo",
                    maxCount: 1,
                },
            ],
        }),

        validate(updateCourseSchema),

        updateCourse
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin", "instructor"),

        deleteCourse
    );

module.exports = router;