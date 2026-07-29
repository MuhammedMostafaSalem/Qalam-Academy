const dotenv = require("dotenv");

dotenv.config();

const env = {
    nodeEnv: process.env.NODE_ENV,

    port: Number(process.env.PORT),

    baseUrl: process.env.BASE_URL,

    clientUrl: process.env.CLIENT_URL,

    mongoUrl: process.env.MONGO_URL,

    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,

    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRE,

    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRE,

    uploadPath: process.env.UPLOAD_PATH,

    maxFileSize: Number(process.env.MAX_FILE_SIZE),

    cookieExpiresIn: Number(process.env.COOKIE_EXPIRES_IN),

    emailHost: process.env.EMAIL_HOST,

    emailPort: process.env.EMAIL_PORT,

    emailUser: process.env.EMAIL_USER,

    emailPass: process.env.EMAIL_PASS,

    paymobBaseUrl: process.env.PAYMOB_BASE_URL,

    paymobApiKey: process.env.PAYMOB_API_KEY,
    
    paymobCardIntegrationId: process.env.PAYMOB_CARD_INTEGRATION_ID,
    
    paymobWalletIntegrationId: process.env.PAYMOB_WALLET_INTEGRATION_ID,
    
    paymobHMAC: process.env.PAYMOB_HMAC,
    
    paymobSecretKey: process.env.PAYMOB_SECRET_KEY,
    
    paymobPublicKey: process.env.PAYMOB_PUBLIC_KEY,
    
    paymobCurrency: process.env.PAYMOB_CURRENCY,

    paymobSuccessUrl: process.env.PAYMOB_SUCCESS_URL,
    
    paymobCancelUrl: process.env.PAYMOB_CANCEL_URL,

    paymobFailureUrl: process.env.PAYMOB_FAILURE_URL,

    paymobWebhookUrl: process.env.PAYMOB_WEBHOOK_URL,

    paypalBaseUrl: process.env.PAYPAL_BASE_URL,

    paypalClientId: process.env.PAYPAL_CLIENT_ID,

    paypalClientsecret: process.env.PAYPAL_CLIENT_SECRET,

    paypalSuccessUrl: process.env.PAYPAL_SUCCESS_URL,
    
    paypalCancelUrl: process.env.PAYPAL_CANCEL_URL,

    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,

    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,

    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

module.exports = env;