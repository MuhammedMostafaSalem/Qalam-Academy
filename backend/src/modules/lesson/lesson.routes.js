const express = require("express");
const {
    getLessons,
    getLesson,
    updateLesson,
    deleteLesson,
    createLesson
} = require("./lesson.controller");
const {
    isAuthenticatedUser,
    authorizeRoles
} = require("../../middlewares/auth");
const uploadMultiple = require("../../middlewares/uploadMultiple");
const validate = require("../../middlewares/validate");
const {
    createLessonSchema,
    updateLessonSchema
} = require("./lesson.schema");

const router = express.Router();

router
    .route("/")
    .get(getLessons)
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin", "instructor"),

        uploadMultiple({
            folder: "lessons",
            fileType: ["image", "video", "pdf"],
            fields: [
                {
                    name: "thumbnail",
                    maxCount: 1,
                },
                {
                    name: "video",
                    maxCount: 1,
                },
                {
                    name: "attachment",
                    maxCount: 1,
                },
            ],
        }),

        validate(createLessonSchema),

        createLesson
    );

router
    .route("/:id")
    .get(getLesson)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin", "instructor"),

        uploadMultiple({
            folder: "lessons",
            fields: [
                {
                    name: "thumbnail",
                    maxCount: 1,
                    fileType: "image",
                },
                {
                    name: "video",
                    maxCount: 1,
                    fileType: "video",
                },
                {
                    name: "attachment",
                    maxCount: 1,
                    fileType: "pdf",
                },
            ],
        }),

        validate(updateLessonSchema),

        updateLesson
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin", "instructor"),
        deleteLesson
    );

module.exports = router;