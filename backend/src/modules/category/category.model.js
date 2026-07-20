const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        enum: [
            "portfolio",
            "service",
            "course",
            "blog",
            "product",
        ],
        required: [true, "Category type is required"],
    },
    sortOrder: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
}, {
    timestamps: true,
});

/* Indexes */
// Search
categorySchema.index({
    title: 1,
});
// Filtering
categorySchema.index({
    type: 1,
    isActive: 1,
});
// Prevent duplicate slug inside the same module
categorySchema.index(
    {
        type: 1,
        slug: 1,
    },
    {
        unique: true,
    }
);

// Auto generate slug
categorySchema.pre("validate", function () {
    if (this.isModified("title")) {
        this.slug = generateSlug(this.title);
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;