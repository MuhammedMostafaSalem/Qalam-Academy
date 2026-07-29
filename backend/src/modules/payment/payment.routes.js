const express = require("express");

const { isAuthenticatedUser } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");

const {
    createPayment,
    paymobWebhook,
    paypalWebhook,
} = require("./payment.controller");

const {
    createPaymentSchema,
} = require("./payment.schema");

const router = express.Router();

// Create Payment Session
router
    .route("/paymob")
    .post(
        isAuthenticatedUser,
        validate(createPaymentSchema),
        createPayment
    );

router
    .route("/paymob/webhook")
    .post(paymobWebhook);

router
    .route("/paypal/webhook")
    .post(paypalWebhook);

module.exports = router;