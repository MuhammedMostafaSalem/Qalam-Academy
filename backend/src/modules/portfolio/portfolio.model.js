const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");
const validator = require("validator");

const portfolioSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: true,
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
        validate: {
            validator: value => !value || validator.isURL(value),
            message: "Please enter a valid project URL.",
        },
    },
    githubUrl: {
        type: String,
        trim: true,
        default: null,
        validate: {
            validator: value => !value || validator.isURL(value),
            message: "Please enter a valid GitHub URL.",
        },
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
    category: 1,
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