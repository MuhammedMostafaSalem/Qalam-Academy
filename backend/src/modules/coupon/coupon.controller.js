const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
} = require("../../utils/crudFactory");
const Coupon = require("./coupon.model");

// Create coupon
exports.createCoupon = createOne(Coupon, {
    modelName: "Coupon",

    beforeCreate: async ({ req }) => {
        req.body.isActive = false;
        req.body.usedCount = 0;
    },
});

// Get all coupons
exports.getCoupons = getAll(Coupon, {
    modelName: "Coupons",

    searchFields: [
        "title",
        "code",
        "description",
    ],

    populate: [
        {
            path: "applicableCourses",
            select: "title slug",
        },
        {
            path: "applicableCategories",
            select: "title slug type",
        },
    ],

    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// Get one coupon
exports.getCoupon = getOne(Coupon, {
    modelName: "Coupon",

    populate: [
        {
            path: "applicableCourses",
            select: "title slug",
        },
        {
            path: "applicableCategories",
            select: "title slug type",
        },
        {
            path: "createdBy",
            select: "username email",
        },
    ],
});

// Update coupon
exports.updateCoupon = updateOne(Coupon, {
    modelName: "Coupon",
});

// Delete coupon
exports.deleteCoupon = deleteOne(Coupon, {
    modelName: "Coupon",
});