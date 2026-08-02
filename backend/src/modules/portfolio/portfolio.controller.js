const { createOne, getAll, getOne, updateOne, deleteOne } = require("../../utils/crudFactory");
const Portfolio = require("./portfolio.model");

// Create Portfolio
exports.createPortfolio = createOne(Portfolio, {
    modelName: "Portfolio",
    fileFields: ["image"],
    translatableFields: [
        "title",
        "description",
    ],
});

// Get all Portfolios
exports.getPortfolios = getAll(Portfolio, {
    modelName: "Portfolios",
    searchFields: [
        "title.en",
        "title.ar",
        "description.en",
        "description.ar"
    ],
    translatableFields: [
        "title",
        "description",
        "category.title",
    ],
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
    translatableFields: [
        "title",
        "description",
        "category.title",
    ],
    populate: {
        path: "category",
        select: "title slug",
    },
});

// Update one Portfolio
exports.updatePortfolio = updateOne(Portfolio, {
    modelName: "Portfolio",
    fileFields: ["image"],
    translatableFields: [
        "title",
        "description",
    ],
});

// Delete one Portfolio
exports.deletePortfolio = deleteOne(Portfolio, {
    modelName: "Portfolio",
    fileFields: ["image"],
});