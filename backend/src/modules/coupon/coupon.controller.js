const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
} = require("../../utils/crudFactory");
const Coupon = require("./coupon.model");

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin/Manager
exports.getCoupons = getAll(Coupon, {
    modelName: "Coupons",
    searchFields: ["name"],
    populate: [
        {
            path: "createdBy",
            select: "firstName lastName email",
        },
    ],
    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// @desc    Get specific coupon by id
// @route   GET /api/coupons/:id
// @access  Private/Admin/Manager
exports.getCoupon = getOne(Coupon, {
    modelName: "Coupon",
    populate: [
        {
            path: "createdBy",
            select: "firstName lastName email",
        },
    ],
});

// @desc    Create coupon
// @route   POST /api/coupons
// @access  Private/Admin/Manager
exports.createCoupon = createOne(Coupon, {
    modelName: "Coupon",
});

// @desc    Update coupon
// @route   PATCH /api/coupons/:id
// @access  Private/Admin/Manager
exports.updateCoupon = updateOne(Coupon, {
    modelName: "Coupon",
});

// @desc    Delete coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin/Manager
exports.deleteCoupon = deleteOne(Coupon, {
    modelName: "Coupon",
});