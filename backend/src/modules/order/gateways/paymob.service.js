const axios = require('axios');
const {
    paymobSecretKey,
    paymobBaseUrl
} = require('../../../config/env');
const PAYMOB_SECRET_KEY = paymobSecretKey; // The new secret key from the Paymob dashboard.
const PAYMOB_API_URL = `${paymobBaseUrl}/v1`;

/*
    * إنشاء Paymob Intention لجميع طرق الدفع (Card, Wallet, Fawry)
*/
exports.createPaymobIntention = async ({
    amount,
    currency = 'EGP',
    billingData,
    items,
    paymentMethods,
    notificationUrl,
    redirectionUrl,
    cartTotalAfterDiscount,
    cartTotalBeforeDiscount
}) => {
    try {
        // حساب نسبة الخصم لتعديل أسعار الـ items بشكل يتطابق مع الإجمالي النهائي بدقة منعاً لخطأ unmatched_item_prices
        let discountRatio = 1;
        if (cartTotalAfterDiscount && cartTotalBeforeDiscount && cartTotalBeforeDiscount > 0) {
            discountRatio = cartTotalAfterDiscount / cartTotalBeforeDiscount;
        }

        const formattedItems = items.map(item => {
            const adjustedPrice = Math.round(item.price * discountRatio);
            return {
                name: item.item.title || 'Product',
                amount: adjustedPrice * 100, // بالقروش
                description: item.item.description || 'Item description',
                quantity: item.count,
            };
        });

        const response = await axios.post(
            `${PAYMOB_API_URL}/intention/`,
            {
                amount: Math.round(amount * 100), // القروش (بالقروش يعني لو 100 جنيه تكتب 10000)
                currency: currency,
                payment_methods: paymentMethods, // مثال: [ids الخاص بـ cards, wallets, fawry] أو الأكياس المتاحة
                items: formattedItems,
                billing_data: {
                    first_name: billingData.firstName || 'Test',
                    last_name: billingData.lastName || 'User',
                    phone_number: billingData.phone || '+201000000000',
                    email: billingData.email || 'test@test.com',
                    apartment: billingData.apartment || 'NA',
                    floor: billingData.floor || 'NA',
                    street: billingData.street || 'NA',
                    building: billingData.building || 'NA',
                    shipping_method: 'PKG',
                    postal_code: billingData.postalCode || '00000',
                    city: billingData.city || 'Cairo',
                    country: billingData.EG || 'EG',
                    state: billingData.state || 'Cairo',
                },
                customer: {
                    first_name: billingData.firstName || 'Test',
                    last_name: billingData.lastName || 'User',
                    email: billingData.email || 'test@test.com',
                },
                redirection_url: redirectionUrl,
                notification_url: notificationUrl,
            },
            {
                headers: {
                    Authorization: `Token ${PAYMOB_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Paymob Intention Error:', error);
        throw new Error(error.response?.data?.detail || 'Failed to create Paymob payment intention');
    }
};