const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    // Relations
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        index: true,
    },

    // Basic Information
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },

    // Media
    video: {
        type: String,
        default: null,
    },
    attachment: {
        type: String,
        default: null,
    },
    thumbnail: {
        type: String,
        default: null,
    },

    // Lesson Details
    duration: {
        type: Number,
        default: 0, // Minutes
        min: 0,
    },
    sortOrder: {
        type: Number,
        default: 1,
        index: true,
    },
    isPreview: {
        // If student isn't subscribed...
        type: Boolean,
        default: false,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
}, {
    timestamps: true,
});

// Compound Indexes
lessonSchema.index({
    course: 1,
    sortOrder: 1,
});
lessonSchema.index({
    course: 1,
    isPublished: 1,
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;