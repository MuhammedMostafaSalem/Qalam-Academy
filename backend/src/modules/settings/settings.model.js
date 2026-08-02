const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
    // Site
    siteName: {
        type: String,
        default: "Qalam Academy",
        trim: true,
    },
    siteDescription: {
        type: String,
        default: "",
        trim: true,
    },

    logoDark: {
        type: String,
        default: null,
    },
    
    logoLight: {
        type: String,
        default: null,
    },

    favicon: {
        type: String,
        default: null,
    },

    // Contact
    supportEmail: {
        type: String,
        default: "",
    },

    supportPhone: {
        type: String,
        default: "",
    },

    whatsapp: {
        type: String,
        default: "",
    },

    address: {
        type: String,
        default: "",
    },

    // Social
    facebook: String,
    instagram: String,
    linkedin: String,
    youtube: String,
    twitter: String,
    tiktok: String,

    // Platform
    allowRegistration: {
        type: Boolean,
        default: true,
    },

    maintenanceMode: {
        type: Boolean,
        default: false,
    },

    // SEO
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],

    currency: {
        type: String,
        default: "EGP",
    },

    defaultLanguage: {
        type: String,
        enum: ["ar", "en"],
        default: "ar",
    },

    // Theme
    theme: {
        light: {
            primary: String,
            secondary: String,
            accent: String,

            background: String,
            surface: String,

            text: String,
            mutedText: String,

            border: String,

            success: String,
            warning: String,
            danger: String,
        },

        dark: {
            primary: String,
            secondary: String,
            accent: String,

            background: String,
            surface: String,

            text: String,
            mutedText: String,

            border: String,

            success: String,
            warning: String,
            danger: String,
        },
    },

    singleton: {
        type: Boolean,
        default: true,
        unique: true,
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

}, {
    timestamps: true,
});

module.exports = mongoose.model(
    "Settings",
    settingsSchema
);