const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");

const partnerSchema = new mongoose.Schema({
    name: {
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
    name: 1,
    slug: 1,
});

// Generate slug automatically
partnerSchema.pre("validate", function () {
    if (this.isModified("name")) {
        this.slug = generateSlug(this.name);
    }
});

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;