const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");

const serviceSchema = new mongoose.Schema({
    title: {
        ar: {
            type: String,
            required: [true, "عنوان الخدمة مطلوب"],
            trim: true,
        },
        en: {
            type: String,
            required: [true, "Service title is required"],
            trim: true,
        },
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    description: {
        ar: {
            type: String,
            trim: true,
            required: [true, "وصف الخدمة مطلوب"],
            default: "",
        },
        en: {
            type: String,
            trim: true,
            required: [true, "Service description is required"],
            default: "",
        }
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
    if (this.isModified("title") && this.title?.en) {
        this.slug = generateSlug(this.title.en);
    }
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;