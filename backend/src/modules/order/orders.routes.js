const express = require("express");

const {
    createCashOrder,
    createPaymobCheckoutSession,
    paymobWebhook,
    getAllOrders,
    getSpecificOrder,
    filterOrdersForLoggedUser,
    createPayPalCheckoutSession,
    verifyPayPalPayment,
    cancelOrder,
    approveCashOrder,
} = require("./orders.controller");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const uploadSingle = require(
    "../../middlewares/uploadSingle"
);

const router = express.Router();

// ==========================================================
// Paymob Webhook
// Public Route
// ==========================================================

router.post(
    "/webhook/paymob",
    paymobWebhook
);

// ==========================================================
// Authentication
// ==========================================================

router.use(
    isAuthenticatedUser
);

// ==========================================================
// Cash Order
// ==========================================================

router
    .route("/:cartId")
    .post(
        authorizeRoles("student"),

        uploadSingle({
            fieldName:
                "paymentProof",

            folder:
                "orders-proofs",

            fileType:
                "image",
        }),

        createCashOrder
    );

// ==========================================================
// Approve Cash Order
// ==========================================================

router
    .route("/:id/approve-cash")
    .patch(
        authorizeRoles("admin"),
        approveCashOrder
    );

// ==========================================================
// Paymob Checkout
// ==========================================================

router
    .route(
        "/checkout-paymob/:cartId"
    )
    .post(
        authorizeRoles("student"),
        createPaymobCheckoutSession
    );

// ==========================================================
// Get All Orders
// ==========================================================

router
    .route("/")
    .get(
        authorizeRoles(
            "student",
            "instructor",
            "admin"
        ),

        filterOrdersForLoggedUser,

        getAllOrders
    );

// ==========================================================
// Get Specific Order
// ==========================================================

router
    .route("/:id")
    .get(
        authorizeRoles(
            "student",
            "instructor",
            "admin"
        ),

        getSpecificOrder
    );

// ==========================================================
// PayPal Checkout
// ==========================================================

router
    .route(
        "/checkout-paypal/:cartId"
    )
    .post(
        authorizeRoles("student"),
        createPayPalCheckoutSession
    );

// ==========================================================
// PayPal Success / Capture
// ==========================================================

router
    .route("/paypal/success")
    .post(
        authorizeRoles("student"),
        verifyPayPalPayment
    );

// ==========================================================
// Cancel Order
// ==========================================================

router
    .route("/:id/cancel")
    .patch(
        authorizeRoles("student"),
        cancelOrder
    );

module.exports = router;