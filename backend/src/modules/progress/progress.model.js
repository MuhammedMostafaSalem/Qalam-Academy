const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
            index: true,
        },

        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
            required: true,
            index: true,
        },

        watchedSeconds: {
            type: Number,
            default: 0,
            min: 0,
        },

        lastPosition: {
            type: Number,
            default: 0,
            min: 0,
        },

        completed: {
            type: Boolean,
            default: false,
        },

        completedAt: {
            type: Date,
            default: null,
        },

        lastWatchedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

progressSchema.index(
    {
        user: 1,
        lesson: 1,
    },
    {
        unique: true,
    }
);

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;