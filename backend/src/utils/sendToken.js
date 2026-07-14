const ms = require("ms");
const env = require("../config/env");
const sendResponse = require("./sendResponse");

// Function to send tokens to the user for login.
const sendToken = async (user, statusCode, res) => {
    // Generating an Access Token: Used to access protected resources (usually short lifespan)
    const accessToken = user.generateAccessToken();
    // Generating a Refresh Token: Used to obtain a new Access Token when the old token expires (it has a long lifespan).
    const refreshToken = user.generateRefreshToken();

    // Cookie settings (Security Options)
    const cookieOptions = {
        expires: new Date(Date.now() + ms(env.jwtRefreshExpiresIn)),
        httpOnly: true,
        sameSite: "strict",
        secure: env.nodeEnv === "production",
    }

    // Store the Refresh Token securely in your browser's cookies.
    res.cookie("refreshToken", refreshToken, cookieOptions);

    // Send success response
    sendResponse(res, {
        statusCode,
        success: true,
        message: "Logged in successfully",
        data: user,
        meta: accessToken,
    })
}

module.exports = sendToken;