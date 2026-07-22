const express = require("express");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const uploadMultiple = require("../../middlewares/uploadMultiple");
const validate = require("../../middlewares/validate");

const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require("./product.controller");

const {
    createProductSchema,
    updateProductSchema,
} = require("./product.schema");

const router = express.Router();

router
    .route("/")
    .get(getProducts)
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadMultiple({
            fields: [
                {
                    name: "image",
                    maxCount: 1,
                },
                {
                    name: "pdf",
                    maxCount: 1,
                },
            ],
            folder: "products",
            fileType: ["image", "pdf"],
        }),
        validate(createProductSchema),
        createProduct
    );

router
    .route("/:id")
    .get(getProduct)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadMultiple({
            fields: [
                {
                    name: "image",
                    maxCount: 1,
                },
                {
                    name: "pdf",
                    maxCount: 1,
                },
            ],
            folder: "products",
            fileType: "image",
        }),
        validate(updateProductSchema),
        updateProduct
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        deleteProduct
    );

module.exports = router;