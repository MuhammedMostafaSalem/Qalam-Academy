const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../../../utils/ApiError");
const {
    paypalBaseUrl,
    paypalClientId,
    paypalClientsecret,
    paypalSuccessUrl,
    paypalCancelUrl,
} = require("../../../config/env");

const PAYPAL_BASE_URL = paypalBaseUrl;
const PAYPAL_CLIENT_ID = paypalClientId;
const PAYPAL_CLIENT_SECRET = paypalClientsecret;

/**
    * توليد Access Token للاتصال بـ PayPal API
*/
const getPayPalAccessToken = async () => {
    try {
        const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
        const response = await axios.post(`${PAYPAL_BASE_URL}/v1/oauth2/token`, 'grant_type=client_credentials', {
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error('PayPal Token Error:', error.response?.data || error.message);
        throw new ApiError('Failed to generate PayPal access token', StatusCodes.BAD_REQUEST);
    }
}

/**
    * إنشاء PayPal Order وإرجاع رابط الموافقة (Approval URL)
*/
exports.createPayPalOrder = async ({ amount, currency = 'USD', orderId }) => {
    const accessToken = await getPayPalAccessToken();

    try {
        const response = await axios.post(
            `${PAYPAL_BASE_URL}/v2/checkout/orders`,
            {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        reference_id: orderId.toString(),
                        amount: {
                            currency_code: currency, // يفضل USD لأن باي بال أحياناً لا يدعم EGP بشكل مباشر في الساندبوكس
                            value: amount.toFixed(2),
                        },
                    },
                ],
                application_context: {
                    return_url: `${paypalSuccessUrl}?orderId=${orderId}`,
                    cancel_url: paypalCancelUrl,
                    user_action: 'PAY_NOW',
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data; // بيحتوي على الـ links (ومنها رابط الـ approve)
    } catch (error) {
        console.error('PayPal Order Error:', error.response?.data || error.message);
        throw new ApiError('Failed to create PayPal payment order', StatusCodes.BAD_REQUEST);
    }
}

/**
    * تأكيد عملية الدفع (Capture Payment) بعد عودة المستخدم
*/
exports.capturePayPalPayment = async (paypalOrderId) => {
    const accessToken = await getPayPalAccessToken();

    try {
        const response = await axios.post(
            `${PAYPAL_BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
        console.log(error.response?.headers);
        throw new ApiError(error.response?.data?.message || "Failed to capture PayPal payment", StatusCodes.BAD_REQUEST);
    }
}