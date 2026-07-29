const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../../../utils/ApiError");
const Order = require("../../order/orders.model");
const {
    completeOrder,
    failOrder,
} = require("../../order/orders.service");
const { PAYMENT_STATUS } = require("../payment.constants");
const { paymobHMAC } = require("../../../config/env");

// Verify Paymob Webhook Signature
exports.verifySignature = (payload) => {
    const receivedHmac = payload.hmac;

    if (!receivedHmac) {
        throw new ApiError("Missing Paymob HMAC", StatusCodes.BAD_REQUEST);
    }

    const obj = payload.obj;

    const concatenated = [
        obj.amount_cents,
        obj.created_at,
        obj.currency,
        obj.error_occured,
        obj.has_parent_transaction,
        obj.id,
        obj.integration_id,
        obj.is_3d_secure,
        obj.is_auth,
        obj.is_capture,
        obj.is_refunded,
        obj.is_standalone_payment,
        obj.is_voided,
        obj.order.id,
        obj.owner,
        obj.pending,
        obj.source_data.pan,
        obj.source_data.sub_type,
        obj.source_data.type,
        obj.success,
    ].join("");

    const calculatedHmac = crypto
        .createHmac("sha512", paymobHMAC)
        .update(concatenated)
        .digest("hex");

    const received = Buffer.from(receivedHmac, "hex");
    const calculated = Buffer.from(calculatedHmac, "hex");

    if (
        received.length !== calculated.length ||
        !crypto.timingSafeEqual(received, calculated)
    ) {
        throw new ApiError("Invalid Paymob signature", StatusCodes.UNAUTHORIZED);
    }

    return obj;
}

// Handle Paymob Webhook
exports.handleWebhook = async (payload) => {
    const transaction = exports.verifySignature(payload);

    const orderId = transaction.order?.extras?.orderId;

    if (!orderId) {
        throw new ApiError("Order reference not found", StatusCodes.BAD_REQUEST);
    }

    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError("Order not found", StatusCodes.NOT_FOUND);
    }

    const expectedAmount = Math.round(
        (order.totalAfterDiscount ?? order.totalPrice) * 100
    );

    if (transaction.amount_cents !== expectedAmount) {
        throw new ApiError("Invalid payment amount", StatusCodes.BAD_REQUEST);
    }

    if (transaction.currency !== "EGP") {
        throw new ApiError("Invalid payment currency", StatusCodes.BAD_REQUEST);
    }

    // Ignore duplicate webhook
    if (
        order.paymentStatus === PAYMENT_STATUS.PAID ||
        order.paymentStatus === PAYMENT_STATUS.FAILED
    ) {
        return order;
    }

    // Ignore pending webhook
    if (transaction.pending) {
        return order;
    }

    console.info({
        provider: "paymob",
        orderId: order._id,
        transactionId: transaction.id,
        success: transaction.success,
        pending: transaction.pending,
    });

    if (
        transaction.success &&
        !transaction.pending &&
        !transaction.error_occured
    ) {
        await completeOrder(order, transaction.id.toString());
    } else {
        await failOrder(order, transaction.id.toString());
    }

    return order;
}