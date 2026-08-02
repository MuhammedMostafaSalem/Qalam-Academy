const mongoose = require("mongoose");

const chooseUsSchema = new mongoose.Schema(
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
        
        subTitle: {
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

const ChooseUs = mongoose.model("ChooseUs", chooseUsSchema);

module.exports = ChooseUs;