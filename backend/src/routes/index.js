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
const productsRoutes = require("../modules/products/product.routes");
const couponRoutes = require("../modules/coupon/coupon.routes");
const cartRoutes = require("../modules/cart/cart.routes");
const orderRoutes = require("../modules/order/orders.routes");
const checkoutRoutes = require("../modules/checkout/checkout.routes");

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
router.use("/products", productsRoutes);
router.use("/coupons", couponRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/checkout", checkoutRoutes);

module.exports = router;