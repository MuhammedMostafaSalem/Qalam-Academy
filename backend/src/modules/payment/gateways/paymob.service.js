const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../../../utils/ApiError");
const {
    paymobBaseUrl,
    paymobSecretKey,
    paymobCurrency,
    paymobWebhookUrl,
    paymobSuccessUrl,
    paymobCardIntegrationId,
    paymobPublicKey,
    paymobWalletIntegrationId
} = require("../../../config/env");

// const paymobApi = axios.create({
//     baseURL: paymobBaseUrl,
//     headers: {
//         Authorization: `Bearer ${paymobSecretKey}`,
//         "Content-Type": "application/json",
//     },
// });

// Get Paymob Authentication Token
// exports.getAuthToken = async () => {
//     try {
//         const { data } = await axios.post(
//             `${paymobBaseUrl}/api/auth/tokens`,
//             {
//                 api_key: paymopApiKey,
//             }
//         );

//         return data.token;
//     } catch (error) {
//         throw new ApiError("Failed to authenticate with Paymob", StatusCodes.BAD_GATEWAY);
//     }
// }

// Create Payment Intention
exports.createPaymentIntention = async ({
    amount,
    orderId,
    customer,
}) => {
    try {
        // const token = await exports.getAuthToken();
        console.log({
            card: paymobCardIntegrationId,
            wallet: paymobWalletIntegrationId,
        });

        const payload = {
            amount: Math.round(amount * 100),
            currency: paymobCurrency,
            payment_methods: [
                Number(paymobCardIntegrationId),
                Number(paymobWalletIntegrationId),
            ],
            items: [
                {
                    name: `Order #${orderId}`,
                    amount: Math.round(amount * 100),
                    description: "Online Learning Platform Order",
                    quantity: 1,
                },
            ],
            billing_data: {
                apartment: "NA",
                first_name: customer.firstName,
                last_name: customer.lastName,
                street: "NA",
                building: "NA",
                phone_number: customer.phone,
                city: "Cairo",
                country: "EG",
                email: customer.email,
                floor: "NA",
                state: "Cairo",
            },
            extras: {
                orderId: orderId.toString(),
            },
            special_reference: orderId.toString(),
            expiration: 3600,
            notification_url: paymobWebhookUrl,
            redirection_url: paymobSuccessUrl,
            // merchant_order_id: orderId.toString(),
        }

        // console.log(JSON.stringify(payload, null, 2));

        const { data } = await axios.post(
            `${paymobBaseUrl}/v1/intention/`,
            payload,
            {
                headers: {
                    Authorization: `Token ${paymobSecretKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log(paymobSecretKey.substring(0, 20));

        // console.log(
        //     JSON.stringify(data, null, 2)
        // );
        return data;
    } catch (error) {
        // console.log(error.response?.data);
        console.log(JSON.stringify(error.response?.data, null, 2));
        // console.log(error);

        throw new ApiError("Failed to create Paymob payment", StatusCodes.BAD_GATEWAY);
    }
}

// Build Checkout URL
exports.buildCheckoutUrl = (clientSecret) => {
    return `https://eg.checkout.paymob.com/?publicKey=${paymobPublicKey}&clientSecret=${clientSecret}`;
};