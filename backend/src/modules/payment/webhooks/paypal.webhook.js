const axios = require("axios");
const { StatusCodes } = require("http-status-codes");

const ApiError = require("../../../utils/ApiError");

const Order = require("../../order/orders.model");

const {
    PAYMENT_STATUS,
    ORDER_STATUS,
} = require("../payment.constants");

const {
    paypalBaseUrl,
    paypalWebhookId,
} = require("../../../config/env");

const paypalService = require("../gateways/paypal.service");

async function verifyWebhook(req) {
    const accessToken =
        await paypalService.generateAccessToken();

    const body = {
        auth_algo: req.headers["paypal-auth-algo"],
        cert_url: req.headers["paypal-cert-url"],
        transmission_id: req.headers["paypal-transmission-id"],
        transmission_sig: req.headers["paypal-transmission-sig"],
        transmission_time: req.headers["paypal-transmission-time"],
        webhook_id: paypalWebhookId,
        webhook_event: req.body,
    };

    const { data } = await axios.post(
        `${paypalBaseUrl}/v1/notifications/verify-webhook-signature`,
        body,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (data.verification_status !== "SUCCESS") {
        throw new ApiError(
            "Invalid PayPal webhook",
            StatusCodes.BAD_REQUEST
        );
    }
}

async function handleCaptured(event) {
    const capture = event.resource;

    const paypalOrderId = capture.supplementary_data
        ?.related_ids
        ?.order_id;

    if (!paypalOrderId) return;

    const paypalOrder =
        await paypalService.getOrder(paypalOrderId);

    const orderId =
        paypalOrder.purchase_units[0].reference_id;

    const order = await Order.findById(orderId);

    if (!order) return;

    order.paymentStatus = PAYMENT_STATUS.PAID;
    order.orderStatus = ORDER_STATUS.PROCESSING;

    await order.save();
}

async function handleFailed(event) {
    const capture = event.resource;

    const paypalOrderId =
        capture.supplementary_data
            ?.related_ids
            ?.order_id;

    if (!paypalOrderId) return;

    const paypalOrder =
        await paypalService.getOrder(paypalOrderId);

    const orderId =
        paypalOrder.purchase_units[0].reference_id;

    const order =
        await Order.findById(orderId);

    if (!order) return;

    order.paymentStatus =
        PAYMENT_STATUS.FAILED;

    await order.save();
}

async function handleApproved(event) {
    return;
}

exports.handlePayPalWebhook = async (req) => {
    await verifyWebhook(req);

    const event = req.body;

    switch (event.event_type) {

        case "CHECKOUT.ORDER.APPROVED":
            return handleApproved(event);

        case "PAYMENT.CAPTURE.COMPLETED":
            return handleCaptured(event);

        case "PAYMENT.CAPTURE.DENIED":
        case "PAYMENT.CAPTURE.DECLINED":
            return handleFailed(event);

        default:
            return;
    }
};