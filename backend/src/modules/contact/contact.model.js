const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "unread",
                "read",
                "replied",
            ],
            default: "unread",
        },

        reply: {
            type: String,
            default: "",
        },

        repliedAt: {
            type: Date,
            default: null,
        },

        repliedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        ipAddress: {
            type: String,
            default: null,
        },

        userAgent: {
            type: String,
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
contactSchema.index({
    fullName: "text",
    email: "text",
    subject: "text",
});

// Filters
contactSchema.index({
    status: 1,
});

// Sort
contactSchema.index({
    createdAt: -1,
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;