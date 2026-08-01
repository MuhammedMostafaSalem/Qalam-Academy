const express = require("express");

const {
    updateProgressSchema,
} = require("./progress.schema");

const validate = require("../../middlewares/validate");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");
const { getContinueWatchingList, getProgress, updateProgress } = require("./progress.controller");

const router = express.Router();

// جميع الـ APIs تتطلب تسجيل الدخول كطالب
router.use(isAuthenticatedUser,authorizeRoles("student"));

// Continue Watching
router.get(
    "/continue-watching",
    getContinueWatchingList
);

// Course Progress
router.get(
    "/course/:courseId",
    getProgress
);

// Update Lesson Progress
router.post(
    "/",
    validate(updateProgressSchema),
    updateProgress
);

module.exports = router;