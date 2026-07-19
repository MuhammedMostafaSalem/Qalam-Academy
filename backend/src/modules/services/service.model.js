const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");

const serviceSchema = new mongoose.Schema({
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
serviceSchema.index({
    title: 1,
    slug: 1,
});

// Generate slug automatically
serviceSchema.pre("validate", function () {
    if (this.isModified("title")) {
        this.slug = generateSlug(this.title);
    }
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;