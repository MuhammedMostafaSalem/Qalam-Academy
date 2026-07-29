const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const { createPayment } = require("./payment.service");
const { handleWebhook } = require("./webhooks/paymob.webhook");
const { handlePayPalWebhook } = require("./webhooks/paypal.webhook");

// Create Payment
exports.createPayment = catchAsync(async (req, res) => {
    const payment = await createPayment(req.body.orderId, req.user);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Payment session created successfully",
        data: payment,
    });
});

// Paymob Webhook
exports.paymobWebhook = catchAsync(async (req, res) => {
    const webhook = await handleWebhook(req.body);

    console.log(
        JSON.stringify(req.body, null, 2)
    );
    
    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Webhook received",
        data: webhook,
    });
});

// PayPal Webhook
exports.paypalWebhook = catchAsync(async (req, res) => {
    await handlePayPalWebhook(req);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Webhook received",
    });
});