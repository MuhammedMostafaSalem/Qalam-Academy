const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");

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
        ar: {
            type: String,
            required: true,
            trim: true,
        },
        en: {
            type: String,
            required: true,
            trim: true,
        },
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
    },
    description: {
        ar: {
            type: String,
            trim: true,
            default: "",
        },
        en: {
            type: String,
            trim: true,
            default: "",
        },
    },

    // Media
    video: {
        type: String,
        default: null,
    },
    videoYoutube: {
        type: String,
        default: null,
        trim: true,
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

// Generate slug automatically
lessonSchema.pre("validate", function () {
    if (this.isModified("title") && this.title?.en) {
        this.slug = generateSlug(this.title.en);
    }
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;