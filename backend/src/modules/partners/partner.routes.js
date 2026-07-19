const express = require("express");

const {
    isAuthenticatedUser,
    authorizeRoles
} = require("../../middlewares/auth");
const uploadSingle = require("../../middlewares/uploadSingle");
const validate = require("../../middlewares/validate");
const { deletePartner, updatePartner, getPartner, createPartner, getPartners } = require("./partner.controller");
const { updatePartnerSchema, createPartnerSchema } = require("./partner.schema");

const router = express.Router();

router
    .route("/")
    .get(getPartners)
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "image",
            folder: "partner",
            fileType: "image",
        }),
        validate(createPartnerSchema),
        createPartner
    );

router
    .route("/:id")
    .get(getPartner)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "image",
            folder: "parner",
            fileType: "image",
        }),
        validate(updatePartnerSchema),
        updatePartner
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        deletePartner
    );

module.exports = router;