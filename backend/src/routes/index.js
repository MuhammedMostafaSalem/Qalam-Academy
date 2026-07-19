const express = require("express");

const authRoutes = require("../modules/auth/auth.routes");
const serviceRoutes = require("../modules/services/service.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/services", serviceRoutes);

module.exports = router;