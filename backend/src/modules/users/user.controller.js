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
const ApiFeatures = require("../../utils/ApiFeatures");

// Public: Get all users
exports.getUsers = getAll(User, {
    modelName: "user",
    searchFields: [
        "firstName",
        "lastName",
        "email",
        "role",
    ],
    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// Admin: Get All Users Except Current Admin
exports.getAllUsersByAdmin = catchAsync(async (req, res) => {
    const features = new ApiFeatures(User, req.query)
        .search([
            "firstName",
            "lastName",
            "email",
            "role",
        ])
        .filter()
        .sort("-createdAt")
        .loadMore(10);

    // Exclude the currently logged-in admin
    features.query = features.query.find({
        _id: {
            $ne: req.user.id,
        },
    });

    // Admin can see more information,
    // but still don't expose password/OTP/reset tokens.
    features.query = features.query.select(
        "firstName lastName slug email avatar role isActive createdAt"
    );

    await features.buildMeta();

    const users = await features.query;

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("user.fetched"),
        data: {
            users,
        },
        meta: features.meta,
    });
});

// Get one user
exports.getUser = getOne(User, {
    modelName: "user",
});

// Update user
exports.updateUser = updateOne(User, {
    modelName: "user",
    fileFields: ["avatar"],
});

// Change Password
exports.changePassword = catchAsync(async (req, res, next) => {
    // Extract currentPassword, newPassword and confirm password from request body
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // User can only change his own password
    if (req.user.id !== req.params.id) {
        return next(new ApiError(req.t("user.notAllowed"), StatusCodes.FORBIDDEN));
    }

    const user = await User.findById(req.params.id).select("+password");

    if (!user) {
        return next(new ApiError(req.t("user.notFound"), StatusCodes.NOT_FOUND));
    }

    const isPasswordMatched = await user.comparePassword(currentPassword);

    if (!isPasswordMatched) {
        return next(new ApiError(req.t("user.incorrectCurrentPassword"), StatusCodes.BAD_REQUEST));
    }

    if (newPassword !== confirmPassword) {
        return next(new ApiError(req.t("user.notMatchComfirmPassword"), StatusCodes.BAD_REQUEST));
    }

    // Optional (Recommended)
    if (currentPassword === newPassword) {
        return next(new ApiError(req.t("user.newPasswordDifferent"), StatusCodes.BAD_REQUEST));
    }

    user.password = newPassword;

    await user.save();

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("user.successMessagePassword"),
        data: null,
    });
});

// Delete user
exports.deleteUser = deleteOne(User, {
    modelName: "user",
    fileFields: ["avatar"],
});

// Update user from admin for role and isActive
exports.updateUserByAdmin = catchAsync(async (req, res, next) => {
    const { role, isActive } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ApiError(req.t("user.notFound"), StatusCodes.NOT_FOUND));
    }

    if (req.params.id === req.user.id && isActive === false) {
        return next(new ApiError(req.t("user.cannotDeactivate"), StatusCodes.BAD_REQUEST));
    }

    if (req.params.id === req.user.id && role && role !== "admin") {
        return next(new ApiError(req.t("user.cannotChangeOwnRole"), StatusCodes.BAD_REQUEST));
    }

    if (role !== undefined) {
        user.role = role;
    }

    if (isActive !== undefined) {
        user.isActive = isActive;
    }

    await user.save();

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("user.updated"),
        data: {
            user,
        },
    });
});

// Get Theme Mode
exports.getThemeMode = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("themeMode");

    if (!user) {
        return next(new ApiError(req.t("user.notFound"), StatusCodes.NOT_FOUND));
    }

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: req.t("user.fetchedThemeMode"),
        data: {
            themeMode: user.themeMode,
        },
    });
});


// Set Theme Mode. The endpoint name is kept for API compatibility, but the
// operation is deterministic so retries and duplicate clicks are safe.
exports.toggleThemeMode = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ApiError(req.t("user.notFound"), StatusCodes.NOT_FOUND));
    }

    user.themeMode = req.body.themeMode;

    await user.save();

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: req.t("user.updatedThemeMode"),
        data: {
            themeMode: user.themeMode,
        },
    });
});

// Get Current User
exports.getCurrentUser = catchAsync(async (req, res, next) => {
    // المفروض الـ protect middleware هو اللي بيحط الـ userId في req.user
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
        return next(new ApiError(req.t(`user.notFound`), StatusCodes.NOT_FOUND));
    }

    // Send success response
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        data: {
            user,
        },
    });
});
