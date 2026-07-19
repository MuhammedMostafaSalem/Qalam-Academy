const express = require("express");

const {
    getServices,
    createService,
    getService,
    updateService,
    deleteService
} = require("./service.controller");

const {
    isAuthenticatedUser,
    authorizeRoles
} = require("../../middlewares/auth");
const uploadSingle = require("../../middlewares/uploadSingle");
const validate = require("../../middlewares/validate");
const { createServiceSchema, updateServiceSchema } = require("./service.schema");

const router = express.Router();

router
    .route("/")
    .get(getServices)
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "image",
            folder: "services",
            fileType: "image",
        }),
        validate(createServiceSchema),
        createService
    );

router
    .route("/:id")
    .get(getService)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "image",
            folder: "services",
            fileType: "image",
        }),
        validate(updateServiceSchema),
        updateService
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        deleteService
    );

module.exports = router;