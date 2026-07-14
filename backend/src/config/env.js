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

    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,

    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,

    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

module.exports = env;