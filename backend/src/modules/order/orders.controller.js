const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder
} = require("./orders.service");

// Create Order
exports.createOrder = catchAsync(async (req, res) => {
    const order = await createOrder(
        req.user.id,
        req.body.paymentMethod
    );

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "Order created successfully",
        data: order,
    });
});

// Get Logged User Orders
exports.getMyOrders = catchAsync(async (req, res) => {
    const orders = await getMyOrders(req.user.id);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Orders fetched successfully",
        data: orders,
    });
});

// Get Order Details
exports.getOrder = catchAsync(async (req, res) => {
    const order = await getOrderById(
        req.params.id,
        req.user.id
    );

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Order fetched successfully",
        data: order,
    });
});

// Cancel Order
exports.cancelOrder = catchAsync(async (req, res) => {
    const order = await cancelOrder(
        req.params.id,
        req.user.id
    );

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Order cancelled successfully",
        data: order,
    });
});