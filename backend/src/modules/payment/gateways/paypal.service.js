const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../../../utils/ApiError");
const {
    paypalClientId,
    paypalBaseUrl,
    paypalSuccessUrl,
    paypalCancelUrl,
    paypalClientsecret
} = require("../../../config/env");

// const PAYPAL_BASE_URL = paypalBaseUrl;

// Generate PayPal Access Token
exports.generateAccessToken = async () => {
    try {
        const auth = Buffer.from(`${paypalClientId}:${paypalClientsecret}`).toString("base64");

        const { data } = await axios.post(
            `${paypalBaseUrl}/v1/oauth2/token`,
            "grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        return data.access_token;
    } catch (error) {
        console.error(error.response?.data);

        throw new ApiError("Failed to authenticate with PayPal", StatusCodes.BAD_GATEWAY);
    }
}

// Build Purchase Unit
exports.buildPurchaseUnit = (order) => {
    return [
        {
            reference_id: order._id.toString(),

            amount: {
                currency_code: "USD",

                value: (
                    order.totalAfterDiscount ??
                    order.totalPrice
                ).toFixed(2),
            },
        },
    ];
}

// Create PayPal Order
exports.createOrder = async (order) => {
    try {
        const accessToken = await exports.generateAccessToken();

        const { data } = await axios.post(
            `${paypalBaseUrl}/v2/checkout/orders`,
            {
                intent: "CAPTURE",

                purchase_units: exports.buildPurchaseUnit(order),

                application_context: {
                    return_url: paypalSuccessUrl,
                    cancel_url: paypalCancelUrl,

                    shipping_preference: "NO_SHIPPING",

                    user_action: "PAY_NOW",
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return data;
    } catch (error) {
        console.error(error.response?.data);

        throw new ApiError("Failed to create PayPal order", StatusCodes.BAD_GATEWAY);
    }
}

// Capture PayPal Order
exports.captureOrder = async (paypalOrderId) => {
    try {
        const accessToken = await exports.generateAccessToken();

        const { data } = await axios.post(
            `${paypalBaseUrl}/v2/checkout/orders/${paypalOrderId}/capture`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return data;
    } catch (error) {
        console.error(error.response?.data);

        throw new ApiError("Failed to capture PayPal payment", StatusCodes.BAD_GATEWAY);
    }
}

// Get PayPal Order
exports.getOrder = async (paypalOrderId) => {
    try {
        const accessToken = await exports.generateAccessToken();

        const { data } = await axios.get(
            `${paypalBaseUrl}/v2/checkout/orders/${paypalOrderId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return data;
    } catch (error) {
        console.error(error.response?.data);

        throw new ApiError("Failed to fetch PayPal order", StatusCodes.BAD_GATEWAY);
    }
};