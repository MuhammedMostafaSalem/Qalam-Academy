const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Service title is required"],
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    description: {
        type: String,
        required: [true, "Service description is required"],
        trim: true,
    },
    image: {
        type: String,
        default: null,
    },
    projectUrl: {
        type: String,
        trim: true,
        default: null,
    },
    githubUrl: {
        type: String,
        trim: true,
        default: null,
    },
    technologies: {
        type: [String],
        default: [],
    },
    category: {
        type: String,
        trim: true,
        required: [true, "Portfolio category is required"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    }
}, {
    timestamps: true,
});

// Compound Index
portfolioSchema.index({
    title: 1,
    slug: 1,
});

// Generate slug automatically
portfolioSchema.pre("validate", function () {
    if (this.isModified("title")) {
        this.slug = generateSlug(this.title);
    }
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;