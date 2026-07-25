const express = require("express");
const { isAuthenticatedUser } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const {
    reviewCheckout,
    createCheckout,
} = require("./checkout.controller");
const {
    createCheckoutSchema,
} = require("./checkout.schema");

const router = express.Router();

// All checkout routes require authentication
router.use(isAuthenticatedUser);

// Review Checkout
router
    .route("/")
    .get(reviewCheckout);

// Create Checkout Session
router
    .route("/create")
    .post(
        validate(createCheckoutSchema),
        createCheckout
    );

module.exports = router;