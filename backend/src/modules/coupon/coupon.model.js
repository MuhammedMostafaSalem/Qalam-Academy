const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");
const ApiError = require("../../utils/ApiError");
const { StatusCodes } = require("http-status-codes");

const couponSchema = new mongoose.Schema({
    // Basic Information
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: "",
    },

    // Discount
    discountType: {
        type: String,
        enum: [
            "fixed",
            "percentage",
        ],
        required: true,
    },
    discountValue: {
        type: Number,
        required: true,
    },
    maximumDiscount: {
        type: Number,
        default: null,
        min: 0,
    },
    minimumAmount: {
        type: Number,
        default: 0,
        min: 0,
    },

    // Usage
    usageLimit: {
        type: Number,
        default: 0, // 0 = Unlimited
        min: 0,
    },
    usedCount: {
        type: Number,
        default: 0,
        min: 0,
    },

    // Validity
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
    },
    endDate: {
        type: Date,
        required: [true, "End date is required"],
    },

    // Relations
    applicableCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
    applicableCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }],

    // Status
    isActive: {
        type: Boolean,
        default: false,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
}, {
    timestamps: true,
});

// Indexes
couponSchema.index({
    startDate: 1,
    endDate: 1,
});
couponSchema.index({
    applicableCourses: 1,
});
couponSchema.index({
    applicableCategories: 1,
});

// Generate slug automatically
couponSchema.pre("validate", function () {
    if (this.isModified("title")) {
        this.slug = generateSlug(this.title);
    }
});

// Validation
couponSchema.pre("save", function () {
    if (this.discountType === "percentage" && this.discountValue > 100) {
        throw new ApiError(
            "Percentage discount cannot exceed 100%.",
            StatusCodes.BAD_REQUEST
        )
    }

    if (this.endDate <= this.startDate) {
        throw new ApiError(
            "End date must be greater than start date.",
            StatusCodes.BAD_REQUEST
        );
    }
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;