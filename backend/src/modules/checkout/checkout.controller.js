const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const {
    reviewCheckout,
    createCheckoutSession,
} = require("./checkout.service");

// Review Checkout
exports.reviewCheckout = catchAsync(async (req, res) => {
    const checkout = await reviewCheckout(req.user.id);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Checkout reviewed successfully",
        data: checkout,
    });
});

// Create Checkout Session
exports.createCheckout = catchAsync(async (req, res) => {
    const checkout = await createCheckoutSession(
        req.user.id,
        req.body.paymentMethod
    );

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "Checkout session created successfully",
        data: checkout,
    });
});