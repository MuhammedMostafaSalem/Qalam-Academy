const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");

const teamSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    position: {
        type: String,
        required: [true, "team position is required"],
        trim: true,
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