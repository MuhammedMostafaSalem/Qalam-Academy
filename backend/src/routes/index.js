const express = require("express");

const authRoutes = require("../modules/auth/auth.routes");
const serviceRoutes = require("../modules/services/service.routes");
const portfolioRoutes = require("../modules/portfolio/portfolio.routes");
const teamRoutes = require("../modules/team/team.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/services", serviceRoutes);
router.use("/portfolios", portfolioRoutes);
router.use("/team", teamRoutes);

module.exports = router;