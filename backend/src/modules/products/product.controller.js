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
    modelName: "Product",
    fileFields: ["image", "pdf"],

    beforeCreate: async ({ req }) => {
        delete req.body.isPublished;
        delete req.body.isFeatured;
    },
});

// Get all products
exports.getProducts = getAll(Product, {
    modelName: "Products",
    searchFields: [
        "title",
        "description",
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
    modelName: "Product",
    populate: [
        {
            path: "category",
            select: "title slug",
        },
    ],
});

// Update Product
exports.updateProduct = updateOne(Product, {
    modelName: "Product",
    fileFields: ["image", "pdf"],
});

// Delete Product
exports.deleteProduct = deleteOne(Product, {
    modelName: "Product",
    fileFields: ["image", "pdf"],
});