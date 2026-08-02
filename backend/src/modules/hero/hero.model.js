const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
    {
        // Page Identifier
        page: {
            type: String,
            required: [true, "Page is required"],
            unique: true,
            lowercase: true,
            trim: true,
            enum: [
                "home",
                "about",
                "courses",
                "course-details",
                "products",
                "product-details",
                "blog",
                "blog-details",
                "contact",
                "wishlist",
                "cart",
                "checkout",
                "login",
                "register",
                "forgot-password",
                "reset-password",
                "profile",
                "dashboard",
            ],
            index: true,
        },

        // Content
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
            }
        },

        subtitle: {
            ar: {
                type: String,
                default: "",
                trim: true,
            },
            en: {
                type: String,
                default: "",
                trim: true,
            }
        },

        description: {
            ar: {
                type: String,
                default: "",
                trim: true,
            },
            en: {
                type: String,
                default: "",
                trim: true,
            }
        },

        // Media
        image: {
            type: String,
            default: null,
        },

        backgroundImage: {
            type: String,
            default: null,
        },

        video: {
            type: String,
            default: null,
        },

        // CTA
        buttonText: {
            ar: {
                type: String,
                default: "",
                trim: true,
            },
            en: {
                type: String,
                default: "",
                trim: true,
            }
        },

        buttonLink: {
            type: String,
            default: "",
            trim: true,
        },

        secondaryButtonText: {
            ar: {
                type: String,
                default: "",
                trim: true,
            },
            en: {
                type: String,
                default: "",
                trim: true,
            }
        },

        secondaryButtonLink: {
            type: String,
            default: "",
            trim: true,
        },

        // Layout
        layout: {
            type: String,
            enum: [
                "center",
                "left",
                "right",
                "split",
                "video",
                "minimal",
            ],
            default: "center",
        },

        textAlignment: {
            type: String,
            enum: [
                "left",
                "center",
                "right",
            ],
            default: "left",
        },

        // Display
        isActive: {
            type: Boolean,
            default: true,
        },

        sortOrder: {
            type: Number,
            default: 1,
        },

        // SEO
        seoTitle: {
            type: String,
            default: "",
        },

        seoDescription: {
            type: String,
            default: "",
        },

        // Audit
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

heroSchema.index({
    page: 1,
    isActive: 1,
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;