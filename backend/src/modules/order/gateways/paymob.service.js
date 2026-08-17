const axios = require('axios');
const {
    paymobSecretKey,
    paymobBaseUrl
} = require('../../../config/env');
const PAYMOB_SECRET_KEY = paymobSecretKey;
const PAYMOB_API_URL = `${paymobBaseUrl || 'https://accept.paymob.com'}/v1`;

/*
    * Create Paymob Intention for Payment (Card, Wallet, Fawry)
*/
exports.createPaymobIntention = async ({
    amount,
    currency = 'EGP',
    billingData = {},
    items = [],
    paymentMethods = [],
    notificationUrl,
    redirectionUrl,
    cartTotalAfterDiscount,
    cartTotalBeforeDiscount
}) => {
    try {
        // Calculate discount ratio for items
        let discountRatio = 1;
        if (cartTotalAfterDiscount && cartTotalBeforeDiscount && cartTotalBeforeDiscount > 0) {
            discountRatio = cartTotalAfterDiscount / cartTotalBeforeDiscount;
        }

        const formattedItems = items.map(item => {
            const rawTitle = item.item?.title;
            const name = typeof rawTitle === 'object'
                ? (rawTitle.ar || rawTitle.en || 'Product')
                : (typeof rawTitle === 'string' && rawTitle.trim() !== '' ? rawTitle : 'Product');

            const rawDesc = item.item?.description;
            const description = typeof rawDesc === 'object'
                ? (rawDesc.ar || rawDesc.en || 'Item description')
                : (typeof rawDesc === 'string' && rawDesc.trim() !== '' ? rawDesc : 'Item description');

            const adjustedPrice = Math.round((item.price || 0) * discountRatio);
            return {
                name: String(name).slice(0, 100),
                amount: Math.max(100, Math.round(adjustedPrice * 100)), // in piastres
                description: String(description).slice(0, 250),
                quantity: item.count || 1,
            };
        });

        const payload = {
            amount: Math.round(amount * 100), // in piastres
            currency: currency,
            payment_methods: paymentMethods.map(id => Number(id)).filter(Boolean),
            items: formattedItems,
            billing_data: {
                first_name: String(billingData.firstName || 'User').trim(),
                last_name: String(billingData.lastName || 'Student').trim(),
                phone_number: String(billingData.phone || '+201000000000').trim(),
                email: String(billingData.email || 'student@qalam.dev').trim(),
                apartment: String(billingData.apartment || 'NA'),
                floor: String(billingData.floor || 'NA'),
                street: String(billingData.street || 'NA'),
                building: String(billingData.building || 'NA'),
                shipping_method: 'PKG',
                postal_code: String(billingData.postalCode || '00000'),
                city: String(billingData.city || 'Cairo'),
                country: 'EG',
                state: String(billingData.state || 'Cairo'),
            },
            customer: {
                first_name: String(billingData.firstName || 'User').trim(),
                last_name: String(billingData.lastName || 'Student').trim(),
                email: String(billingData.email || 'student@qalam.dev').trim(),
            },
            redirection_url: redirectionUrl,
            notification_url: notificationUrl,
        };

        const response = await axios.post(
            `${PAYMOB_API_URL}/intention/`,
            payload,
            {
                headers: {
                    Authorization: `Token ${PAYMOB_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        const errorDetail = error.response?.data ? JSON.stringify(error.response.data) : error.message;
        console.error('Paymob Intention Error Details:', errorDetail);
        throw new Error(errorDetail || 'Failed to create Paymob payment intention');
    }
};