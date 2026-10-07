const mongoose = require("mongoose");

// Localized Text Schema
const localizedTextSchema = new mongoose.Schema(
    {
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
    {
        _id: false,
    },
);

/**
    * Page Section Item Schema
    *
    * Used for sections that contain
    * a dynamic list of items.
    *
    * Examples:
    * - Why Choose Us
    * - Values
    * - Process
    * - Stats
*/
const pageSectionItemSchema = new mongoose.Schema(
    {
        icon: {
            type: String,
            trim: true,
            default: "",
        },

        content: {
            title: {
                type: localizedTextSchema,
                default: null,
            },

            description: {
                type: localizedTextSchema,
                default: null,
            },
        },
    },
    {
        _id: true,
    },
);

// Page Section Schema
const pageSectionSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        section: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        content: {
            badge: {
                type: localizedTextSchema,
                default: null,
            },

            title: {
                type: localizedTextSchema,
                default: null,
            },

            description: {
                type: localizedTextSchema,
                default: null,
            },
        },

        /**
            * Optional dynamic items.
            *
            * Sections that do not need items
            * can simply keep this as [].
        */
        items: {
            type: [pageSectionItemSchema],
            default: [],
        },

        isActive: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

/**
    * Prevent duplicate sections
    * on the same page.
*/
pageSectionSchema.index(
    {
        page: 1,
        section: 1,
    },
    {
        unique: true,
    },
);

const PageSection = mongoose.model("PageSection", pageSectionSchema);

module.exports = PageSection;