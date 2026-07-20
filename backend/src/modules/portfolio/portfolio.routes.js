const express = require("express");

const {
    isAuthenticatedUser,
    authorizeRoles
} = require("../../middlewares/auth");
const uploadSingle = require("../../middlewares/uploadSingle");
const validate = require("../../middlewares/validate");
const {
    deletePortfolio,
    updatePortfolio,
    getPortfolio,
    getPortfolios,
    createPortfolio
} = require("./portfolio.controller");
const {
    updatePortfolioSchema,
    createPortfolioSchema
} = require("./portfolio.schema");

const router = express.Router();

router
    .route("/")
    .get(getPortfolios)
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "image",
            folder: "portfolios",
            fileType: "image",
        }),
        validate(createPortfolioSchema),
        createPortfolio
    );

router
    .route("/:id")
    .get(getPortfolio)
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        uploadSingle({
            fieldName: "image",
            folder: "portfolios",
            fileType: "image",
        }),
        validate(updatePortfolioSchema),
        updatePortfolio
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        deletePortfolio
    );

module.exports = router;