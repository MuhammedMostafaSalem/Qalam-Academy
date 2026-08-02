const express = require("express");

const {
    getChoose,
    updateChoose,
} = require("./choose.controller");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const uploadSingle = require("../../middlewares/uploadSingle");
const validate = require("../../middlewares/validate");

const {
    updateChooseSchema,
} = require("./choose.schema");

const parseNestedFormData = require("../../middlewares/parseNestedFormData");

const router = express.Router();

router
    .route("/")
    .get(getChoose)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "image",
            folder: "choose",
            fileType: "image",
        }),
        parseNestedFormData,
        validate(updateChooseSchema),
        updateChoose
    );

module.exports = router;