const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middlewares/catchAsync");
const ApiError = require("../../utils/ApiError");
const {
    getAll,
    getOne,
    updateOne,
    deleteOne
} = require("../../utils/crudFactory");
const User = require("./user.model");
const sendResponse = require("../../utils/sendResponse");

// Get all users
exports.getUsers = getAll(User, {
    modelName: "Users",
    searchFields: [
        "username",
        "email",
        "role",
    ],
    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// Get one user
exports.getUser = getOne(User, {
    modelName: "User",
});

// Update user
exports.updateUser = updateOne(User, {
    modelName: "User",
    fileFields: ["avatar"],
});

// Change Password
exports.changePassword = catchAsync(async (req, res, next) => {
    // Extract currentPassword, newPassword and confirm password from request body
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // User can only change his own password
    if (req.user.id !== req.params.id)
        next(new ApiError("You are not allowed to change another user's password", StatusCodes.FORBIDDEN));

    const user = await User.findById(req.params.id).select("+password");

    if (!user)
        next(new ApiError("User not found", StatusCodes.NOT_FOUND));

    const isPasswordMatched = await user.comparePassword(currentPassword);

    if (!isPasswordMatched)
        next(new ApiError("Current password is incorrect", StatusCodes.BAD_REQUEST));

    if (newPassword !== confirmPassword)
        next(new ApiError("Password confirmation does not match", StatusCodes.BAD_REQUEST));

    // Optional (Recommended)
    if (currentPassword === newPassword)
        next(new ApiError("New password must be different from current password", StatusCodes.BAD_REQUEST));

    user.password = newPassword;

    await user.save();

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Password changed successfully.",
        data: null,
    });
});

// Delete user
exports.deleteUser = deleteOne(User, {
    modelName: "User",
    fileFields: ["avatar"],
});