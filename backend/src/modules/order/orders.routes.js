const express = require("express");

const {
    isAuthenticatedUser,
} = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const {
    createOrderSchema
} = require("./orders.schema");
const {
    createOrder,
    getMyOrders,
    getOrder,
    cancelOrder
} = require("./orders.controller");

const router = express.Router();

router.use(isAuthenticatedUser);

// Create Order + Get My Orders
router
    .route("/")
    .post(
        validate(createOrderSchema),
        createOrder
    )
    .get(getMyOrders);

// Get Order Details
router
    .route("/:id")
    .get(getOrder);

// Cancel Order
router
    .route("/:id/cancel")
    .patch(cancelOrder);

module.exports = router;