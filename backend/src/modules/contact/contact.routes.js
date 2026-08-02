const express = require("express");
const {
    createContact,
    getContacts,
    getContact,
    updateContact,
    deleteContact,
} = require("./contact.controller");
const {
    createContactSchema,
    updateContactSchema,
} = require("./contact.schema");
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");

const router = express.Router();

/*
    Public Routes
*/
router.post(
    "/",
    validate(createContactSchema),
    createContact
);

/*
    Admin Routes
*/
router
    .route("/")
    .get(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        getContacts
    );

router
    .route("/:id")
    .get(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        getContact
    )
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        validate(updateContactSchema),
        updateContact
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        deleteContact
    );

module.exports = router;