const { StatusCodes } = require("http-status-codes");

const Coupon = require("./coupon.model");
const ApiError = require("../../utils/ApiError");

// Validate coupon before checkout
exports.validateCoupon = async (couponName, userId) => {
    const coupon = await Coupon.findOne({
        name: couponName.trim().toUpperCase(),
    });

    if (!coupon)
        throw new ApiError("Coupon not found", StatusCodes.NOT_FOUND);

    if (!coupon.isActive)
        throw new ApiError("Coupon is inactive", StatusCodes.BAD_REQUEST);

    if (new Date() >= coupon.expire) // if (coupon.expire < new Date())
        throw new ApiError("Coupon has expired", StatusCodes.BAD_REQUEST);

    if (coupon.usedCount >= coupon.usageLimit)
        throw new ApiError("Coupon usage limit reached", StatusCodes.BAD_REQUEST);

    const userUsage = coupon.usersUsed.find((item) => item.user.equals(userId));

    if (
        userUsage &&
        userUsage.count >= coupon.perUserLimit
    ) {
        throw new ApiError(
            "You have already reached the usage limit for this coupon",
            StatusCodes.BAD_REQUEST
        );
    }

    return coupon;
}

// Increase coupon usage after successful payment
exports.redeemCoupon = async (coupon, userId) => {
    coupon.usedCount += 1;

    const userUsage = coupon.usersUsed.find((item) => item.user.equals(userId));

    if (userUsage) {
        userUsage.count += 1;
        userUsage.usedAt = new Date();
    } else {
        coupon.usersUsed.push({
            user: userId,
            count: 1,
            usedAt: new Date(),
        });
    }

    await coupon.save();

    return coupon;
}

exports.calculateDiscount = (price, coupon) => {
    const finalPrice = price - (price * coupon.discount) / 100;
    
    return Number(finalPrice.toFixed(2));
};