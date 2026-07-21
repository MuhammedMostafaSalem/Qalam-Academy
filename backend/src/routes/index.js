const express = require("express");

const authRoutes = require("../modules/auth/auth.routes");
const serviceRoutes = require("../modules/services/service.routes");
const portfolioRoutes = require("../modules/portfolio/portfolio.routes");
const teamRoutes = require("../modules/team/team.routes");
const partnerRoutes = require("../modules/partners/partner.routes");
const categoryRoutes = require("../modules/category/category.route");
const courseRoutes = require("../modules/course/course.routes");
const lessonRoutes = require("../modules/lesson/lesson.routes");
const userRoutes = require("../modules/users/user.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/services", serviceRoutes);
router.use("/portfolios", portfolioRoutes);
router.use("/team", teamRoutes);
router.use("/partners", partnerRoutes);
router.use("/categories", categoryRoutes);
router.use("/courses", courseRoutes);
router.use("/lessons", lessonRoutes);
router.use("/users", userRoutes);

module.exports = router;