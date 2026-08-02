const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema(
    {
        year: {
            type: Number,
            required: [true, "Year is required"],
            min: 1900,
            max: 3000,
        },

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

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

// ترتيب الـ Timeline
timelineSchema.index({
    sortOrder: 1,
});

// فلترة العناصر النشطة
timelineSchema.index({
    isActive: 1,
});

// منع تكرار السنة
timelineSchema.index(
    {
        year: 1,
    },
    {
        unique: true,
    }
);

const Timeline = mongoose.model("Timeline", timelineSchema);

module.exports = Timeline;