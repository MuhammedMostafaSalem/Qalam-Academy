const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");
const ApiError = require("../../utils/ApiError");
const { StatusCodes } = require("http-status-codes");

const productSchema = new mongoose.Schema({
    // Basic Information
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },

    // Media
    image: {
        type: String,
        default: null,
    },
    pdf: {
        type: String,
        default: null,
    },

    // Status
    isPublished: {
        type: Boolean,
        default: false,
    },

    isFeatured: {
        type: Boolean,
        default: false,
    },

    // Relations
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true,
    },

    // Pricing
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        required: true,
    },

    // Statistics
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    totalReviews: {
        type: Number,
        default: 0,
        min: 0,
    },
    totalSales: {
        type: Number,
        default: 0,
        min: 0,
    },

    // Audit
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
}, {
    timestamps: true,
});

// Generate Slug
productSchema.pre("validate", function () {
    if (this.isModified("title")) {
        this.slug = generateSlug(this.title);
    }
});

// Validate Discount Price
productSchema.pre("save", function () {
    if (this.discountPrice > this.price) {
        throw new ApiError("Discount price cannot be greater than price", StatusCodes.BAD_REQUEST);
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;