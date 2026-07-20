const { createOne, getAll, getOne, updateOne, deleteOne } = require("../../utils/crudFactory");
const Portfolio = require("./portfolio.model");

// Create Portfolio
exports.createPortfolio = createOne(Portfolio, {
    modelName: "Portfolio",
    fileFields: ["image"],
});

// Get all Portfolios
exports.getPortfolios = getAll(Portfolio, {
    modelName: "Portfolios",
    searchFields: ["title", "description"],
    defaultLimit: 10,
    defaultSort: "-createdAt",

    populate: {
        path: "category",
        select: "title slug",
    },
});

// Get one Portfolio
exports.getPortfolio = getOne(Portfolio, {
    modelName: "Portfolio",
    populate: {
        path: "category",
        select: "title slug",
    },
});

// Update one Portfolio
exports.updatePortfolio = updateOne(Portfolio, {
    modelName: "Portfolio",
    fileFields: ["image"],
});

// Delete one Portfolio
exports.deletePortfolio = deleteOne(Portfolio, {
    modelName: "Portfolio",
    fileFields: ["image"],
});