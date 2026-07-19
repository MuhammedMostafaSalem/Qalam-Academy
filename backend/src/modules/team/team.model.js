const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");

const teamSchema = new mongoose.Schema({
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
    position: {
        type: String,
        required: [true, "team position is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "team email is required"],
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
teamSchema.index({
    title: 1,
    slug: 1,
});

// Generate slug automatically
teamSchema.pre("validate", function () {
    if (this.isModified("title")) {
        this.slug = generateSlug(this.title);
    }
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;