const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema(
    {
        title: {
            ar: {
                type: String,
                trim: true,
                default: ""
            },
            en: {
                type: String,
                trim: true,
                default: ""
            },
        },

        description: {
            ar: {
                type: String,
                trim: true,
                default: ""
            },
            en: {
                type: String,
                trim: true,
                default: ""
            },
        },

        image: {
            type: String,
            default: null,
        },

        badge: {
            ar: {
                type: String,
                trim: true,
                default: ""
            },
            en: {
                type: String,
                trim: true,
                default: ""
            },
        },

        badgeDescription: {
            ar: {
                type: String,
                trim: true,
                default: ""
            },
            en: {
                type: String,
                trim: true,
                default: ""
            },
        },

        isActive: {
            type: Boolean,
            default: true,
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
    },
    {
        timestamps: true,
    }
);

const Journey = mongoose.model("Journey", journeySchema);

module.exports = Journey;