const axios = require("axios");

const {
    StatusCodes,
} = require("http-status-codes");

const ApiError = require(
    "../../../utils/ApiError"
);

const {
    paypalBaseUrl,
    paypalClientId,
    paypalClientsecret,
    paypalSuccessUrl,
    paypalCancelUrl,
} = require(
    "../../../config/env"
);

const PAYPAL_BASE_URL =
    paypalBaseUrl;

const PAYPAL_CLIENT_ID =
    paypalClientId;

const PAYPAL_CLIENT_SECRET =
    paypalClientsecret;

// ==========================================================
// Generate PayPal Access Token
// ==========================================================

const getPayPalAccessToken =
    async () => {
        try {
            const auth =
                Buffer.from(
                    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
                ).toString(
                    "base64"
                );

            const response =
                await axios.post(
                    `${PAYPAL_BASE_URL}/v1/oauth2/token`,

                    "grant_type=client_credentials",

                    {
                        headers: {
                            Authorization:
                                `Basic ${auth}`,

                            "Content-Type":
                                "application/x-www-form-urlencoded",
                        },
                    }
                );

            return response.data
                .access_token;
        } catch (error) {
            console.error(
                "PayPal Token Error:",
                error.response
                    ?.data ||
                    error.message
            );

            throw new ApiError(
                "Failed to generate PayPal access token",
                StatusCodes.BAD_REQUEST
            );
        }
    };

// ==========================================================
// Get PayPal Order
// ==========================================================

exports.getPayPalOrder =
    async (
        paypalOrderId
    ) => {
        const accessToken =
            await getPayPalAccessToken();

        try {
            const response =
                await axios.get(
                    `${PAYPAL_BASE_URL}/v2/checkout/orders/${paypalOrderId}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${accessToken}`,

                            "Content-Type":
                                "application/json",
                        },
                    }
                );

            return response.data;
        } catch (error) {
            console.error(
                "PayPal Get Order Error:",
                JSON.stringify(
                    error.response
                        ?.data,
                    null,
                    2
                )
            );

            throw new ApiError(
                "Failed to get PayPal order",
                error.response
                    ?.status ||
                    StatusCodes.BAD_REQUEST
            );
        }
    };

// ==========================================================
// Create PayPal Order
// ==========================================================

exports.createPayPalOrder =
    async ({
        amount,
        currency = "USD",
        orderId,
    }) => {
        const accessToken =
            await getPayPalAccessToken();

        try {
            const response =
                await axios.post(
                    `${PAYPAL_BASE_URL}/v2/checkout/orders`,

                    {
                        intent: "CAPTURE",

                        purchase_units: [
                            {
                                // Our MongoDB Order ID
                                reference_id:
                                    orderId.toString(),

                                amount: {
                                    currency_code:
                                        currency,

                                    value:
                                        Number(
                                            amount
                                        ).toFixed(
                                            2
                                        ),
                                },
                            },
                        ],

                        application_context: {
                            return_url:
                                `${paypalSuccessUrl}?orderId=${orderId}`,

                            cancel_url:
                                `${paypalCancelUrl}?orderId=${orderId}`,

                            user_action:
                                "PAY_NOW",
                        },
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${accessToken}`,

                            "Content-Type":
                                "application/json",
                        },
                    }
                );

            return response.data;
        } catch (error) {
            console.error(
                "PayPal Order Error:",
                JSON.stringify(
                    error.response
                        ?.data,
                    null,
                    2
                )
            );

            throw new ApiError(
                "Failed to create PayPal payment order",
                error.response
                    ?.status ||
                    StatusCodes.BAD_REQUEST
            );
        }
    };

// ==========================================================
// Capture PayPal Payment
// ==========================================================

exports.capturePayPalPayment =
    async (
        paypalOrderId
    ) => {
        const accessToken =
            await getPayPalAccessToken();

        try {
            const response =
                await axios.post(
                    `${PAYPAL_BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`,

                    {},

                    {
                        headers: {
                            Authorization:
                                `Bearer ${accessToken}`,

                            "Content-Type":
                                "application/json",

                            // Prevent duplicate capture
                            "PayPal-Request-Id":
                                `capture-${paypalOrderId}`,
                        },
                    }
                );

            return response.data;
        } catch (error) {
            console.error(
                "PayPal Capture Error:",
                JSON.stringify(
                    error.response
                        ?.data,
                    null,
                    2
                )
            );

            console.error(
                "Status:",
                error.response
                    ?.status
            );

            console.error(
                "Debug ID:",
                error.response
                    ?.data
                    ?.debug_id
            );

            const paypalError =
                error.response
                    ?.data;

            const apiError =
                new ApiError(
                    paypalError
                        ?.message ||
                        "Failed to capture PayPal payment",

                    error.response
                        ?.status ||
                        StatusCodes.BAD_REQUEST
                );

            // Keep PayPal details available
            apiError.paypalError =
                paypalError;

            throw apiError;
        }
    };