const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
} = require("../../utils/crudFactory");
const Product = require("./product.model");

// Create product
exports.createProduct = createOne(Product, {
    modelName: "product",
    fileFields: ["image", "pdf"],
    translatableFields: [
        "title",
        "description",
    ],
    beforeCreate: async ({ req }) => {
        delete req.body.isPublished;
        delete req.body.isFeatured;
    },
});

// Get all products
exports.getProducts = getAll(Product, {
    modelName: "product",
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
    populate: [
        {
            path: "category",
            select: "title slug",
        },
    ],
    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// Get one product
exports.getProduct = getOne(Product, {
    modelName: "product",
    translatableFields: [
        "title",
        "description",
        "category.title",
    ],
    populate: [
        {
            path: "category",
            select: "title slug",
        },
    ],
});

// Update Product
exports.updateProduct = updateOne(Product, {
    modelName: "product",
    fileFields: ["image", "pdf"],
    translatableFields: [
        "title",
        "description",
    ],
});

// Delete Product
exports.deleteProduct = deleteOne(Product, {
    modelName: "product",
    fileFields: ["image", "pdf"],
});