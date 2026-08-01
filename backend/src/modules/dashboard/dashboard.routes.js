const express = require("express");
const {
    getAdminDashboard,
    getInstructorDashboard,
    getStudentDashboard,
} = require("./dashboard.controller");
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const router = express.Router();

router.use(isAuthenticatedUser);

//  Admin Dashboard
router.get(
    "/admin",
    authorizeRoles("admin"),
    getAdminDashboard
);

// Instructor Dashboard
router.get(
    "/instructor",
    authorizeRoles("instructor"),
    getInstructorDashboard
);

// Student Dashboard
router.get(
    "/student",
    authorizeRoles("student"),
    getStudentDashboard
);

module.exports = router;