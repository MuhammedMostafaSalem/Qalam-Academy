// Payment Providers
const PAYMENT_PROVIDERS = {
    PAYMOB: "paymob",
    PAYPAL: "paypal",
};

// Payment Methods
const PAYMENT_METHODS = {
    CARD: "card",
    VODAFONE_CASH: "vodafone_cash",
    ETISALAT_CASH: "etisalat_cash",
    ORANGE_CASH: "orange_cash",
    FAWRY: "fawry",
    PAYPAL: "paypal",
};

// Payment Status
const PAYMENT_STATUS = {
    PENDING: "pending",
    PAID: "paid",
    FAILED: "failed",
    REFUNDED: "refunded",
};

// Order Status
const ORDER_STATUS = {
    PENDING: "pending",
    PROCESSING: "processing",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
};

module.exports = {
    PAYMENT_PROVIDERS,
    PAYMENT_METHODS,
    PAYMENT_STATUS,
    ORDER_STATUS,
};