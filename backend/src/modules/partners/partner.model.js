const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");

const partnerSchema = new mongoose.Schema({
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
    image: {
        type: String,
        default: null,
    },
    partnerUrl: {
        type: String,
        trim: true,
        default: null,
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
partnerSchema.index({
    title: 1,
    slug: 1,
});

// Generate slug automatically
partnerSchema.pre("validate", function () {
    if (this.isModified("title")) {
        this.slug = generateSlug(this.title);
    }
});

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;