const { supportEmail } = require("../../config/env");
const contactNotificationTemplate = require("../../templates/contactNotificationTemplate");
const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
} = require("../../utils/crudFactory");
const sendEmail = require("../../utils/sendEmail");

const Contact = require("./contact.model");


// Create Contact Message
exports.createContact = createOne(Contact, {
    modelName: "contact",

    beforeCreate: async ({ req }) => {
        req.body.ipAddress =
            req.ip ||
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress;

        req.body.userAgent =
            req.headers["user-agent"] || "";
    },

    afterCreate: async ({ document }) => {
        try {
            await sendEmail({
                email: supportEmail,
                subject: `New Contact Message | ${document.subject}`,
                html: contactNotificationTemplate({
                    fullName: document.fullName,
                    email: document.email,
                    phone: document.phone,
                    subject: document.subject,
                    message: document.message,
                }),
            });
        } catch (err) {
            console.error("Contact Email Error:", err.message);
        }
    },
});


// Get All Messages
exports.getContacts = getAll(Contact, {
    modelName: "contact",

    searchFields: [
        "fullName",
        "email",
        "subject",
    ],

    populate: {
        path: "repliedBy",
        select: "firstName lastName email",
    },

    defaultLimit: 10,

    defaultSort: "-createdAt",
});


// Get One Message
exports.getContact = getOne(Contact, {
    modelName: "contact",

    populate: {
        path: "repliedBy",
        select: "firstName lastName email",
    },
});


// Update Message
exports.updateContact = updateOne(Contact, {
    modelName: "contact",

    beforeUpdate: async ({ req }) => {
        // لو الأدمن كتب Reply
        if (
            req.body.reply &&
            req.body.reply.trim() !== ""
        ) {
            req.body.status = "replied";
            req.body.repliedAt = new Date();

            if (req.user) {
                req.body.repliedBy = req.user._id;
            }
        }

        // لو غير الحالة فقط
        if (
            req.body.status === "read" &&
            !req.body.reply
        ) {
            req.body.status = "read";
        }
    },
});


// Delete Message
exports.deleteContact = deleteOne(Contact, {
    modelName: "contact",
});