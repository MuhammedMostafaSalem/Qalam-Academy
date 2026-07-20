const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");
const ApiError = require("../../utils/ApiError");
const { StatusCodes } = require("http-status-codes");

const courseSchema = new mongoose.Schema({
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
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },

    // Media
    thumbnail: {
        type: String,
        default: null,
    },
    trailerVideo: {
        type: String,
        default: null,
    },

    // Relations
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"],
        index: true,
    },

    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    // Course Details
    level: {
        type: String,
        enum: [
            "beginner",
            "intermediate",
            "advanced",
        ],
        required: true,
    },
    language: {
        type: String,
        enum: [
            "arabic",
            "english",
        ],
        default: "arabic",
    },
    duration: {
        type: Number,
        default: 0, // minutes
        min: 0,
    },

    // Pricing
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    discountPrice: {
        type: Number,
        default: 0,
        min: [0, "Discount price cannot be negative"],
    },

    // Arrays
    requirements: {
        type: [String],
        default: [],
    },
    objectives: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
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
    totalStudents: {
        type: Number,
        default: 0,
        min: 0,
    },
    totalLessons: {
        type: Number,
        default: 0,
        min: 0,
    },

    // ----------------
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
}, {
    timestamps: true,
});

// Compound indexes
courseSchema.index({
    category: 1,
    instructor: 1,
    isPublished: 1,
});

// Generate slug automatically
courseSchema.pre("validate", function () {
    if (this.isModified("title")) {
        this.slug = generateSlug(this.title);
    }
});

// Validate discount price
courseSchema.pre("save", function () {
    if (this.discountPrice > this.price) {
        throw new ApiError("Discount price cannot be greater than the original price", StatusCodes.BAD_REQUEST)
    }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;