const mongoose = require("mongoose");
const generateSlug = require("../../utils/generateSlug");

const blogSchema = new mongoose.Schema(
    {
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
            trim: true,
            lowercase: true,
        },

        excerpt: {
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

        content: {
            ar: {
                type: String,
                required: true,
            },
            en: {
                type: String,
                required: true,
            },
        },

        featuredImage: {
            type: String,
            default: null,
        },

        gallery: [
            {
                type: String,
            },
        ],

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        tags: [
            {
                ar: String,
                en: String,
            },
        ],

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        seoTitle: {
            ar: {
                type: String,
                default: "",
            },
            en: {
                type: String,
                default: "",
            },
        },

        seoDescription: {
            ar: {
                type: String,
                default: "",
            },
            en: {
                type: String,
                default: "",
            },
        },

        readingTime: {
            type: Number,
            default: 1,
            min: 1,
        },

        views: {
            type: Number,
            default: 0,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        isPublished: {
            type: Boolean,
            default: false,
        },

        publishedAt: {
            type: Date,
            default: null,
        },

        createdBy: {
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
| Indexes
*/

// Search
blogSchema.index({
    "title.ar": "text",
    "title.en": "text",
    "excerpt.ar": "text",
    "excerpt.en": "text",
});

// Filtering
blogSchema.index({
    category: 1,
    isPublished: 1,
    isFeatured: 1,
});

// Sorting
blogSchema.index({
    publishedAt: -1,
    createdAt: -1,
    views: -1,
});

// Slug
blogSchema.index(
    {
        slug: 1,
    },
    {
        unique: true,
    }
);

// Auto Generate Slug
blogSchema.pre("validate", function () {
    if (this.isModified("title") && this.title?.en) {
        this.slug = generateSlug(this.title.en);
    }
});


// Auto Reading Time
blogSchema.pre("save", function () {
    if (this.isModified("content") && this.content?.en) {
        const words = this.content.en.split(/\s+/).length;

        this.readingTime = Math.max(
            1,
            Math.ceil(words / 200)
        );
    }
});


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;