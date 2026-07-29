const { StatusCodes } = require("http-status-codes");
const ApiError = require("../../utils/ApiError");
const Order = require("../order/orders.model");
const {
    PAYMENT_METHODS,
    PAYMENT_STATUS,
    ORDER_STATUS,
    PAYMENT_PROVIDERS,
} = require("./payment.constants");
const paymobService = require("./gateways/paymob.service");
const paypalService = require("./gateways/paypal.service");

// Create Payment
exports.createPayment = async (orderId, user) => {
    const order = await Order.findOne({
        _id: orderId,
        user: user._id,
    });

    if (!order) {
        throw new ApiError("Order not found", StatusCodes.NOT_FOUND);
    }

    if (order.paymentStatus !== PAYMENT_STATUS.PENDING) {
        throw new ApiError("Order is already paid or processed", StatusCodes.BAD_REQUEST);
    }

    switch (order.paymentMethod) {
        // Paymob
        case PAYMENT_METHODS.CARD:
        case PAYMENT_METHODS.VODAFONE_CASH:
        case PAYMENT_METHODS.ETISALAT_CASH:
        case PAYMENT_METHODS.ORANGE_CASH:
        case PAYMENT_METHODS.FAWRY: {
            const intention = await paymobService.createPaymentIntention({
                amount:
                    order.totalAfterDiscount ??
                    order.totalPrice,

                orderId: order._id,

                customer: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                },
            });

            return {
                provider: PAYMENT_PROVIDERS.PAYMOB,
                checkoutUrl:
                    paymobService.buildCheckoutUrl(
                        intention.client_secret
                    ),
                intentionId: intention.id,
            }
        }

        // PayPal
        case PAYMENT_METHODS.PAYPAL: {
            const paypalOrder = await paypalService.createOrder(order);
            const approveLink = paypalOrder.links.find(
                (link) => link.rel === "approve"
            );

            if (!approveLink) {
                throw new ApiError("PayPal approval link not found", StatusCodes.BAD_GATEWAY);
            }

            return {
                provider: PAYMENT_PROVIDERS.PAYPAL,
                orderId: paypalOrder.id,
                checkoutUrl: approveLink.href,
            }
        }

        default: throw new ApiError("Unsupported payment method", StatusCodes.BAD_REQUEST);
    }
}