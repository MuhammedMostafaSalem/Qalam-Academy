const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
} = require("../../utils/crudFactory");
const Category = require("./category.model");

// Create category
exports.createCategory = createOne(Category, {
    modelName: "Category",
    fileFields: ["image"],
    beforeCreate: async ({ req, Model }) => {
        const lastCategory = await Model
            .findOne()
            .sort("-sortOrder");

        req.body.sortOrder = lastCategory
            ? lastCategory.sortOrder + 1
            : 1;
    },
});

// Get all categories
exports.getCategories = getAll(Category, {
    modelName: "Categories",
    searchFields: ["title", "description"],
    defaultLimit: 10,
    defaultSort: "sortOrder",
});

// Get one category
exports.getCategory = getOne(Category, {
    modelName: "Category",
});

// Update category
exports.updateCategory = updateOne(Category, {
    modelName: "Category",
    fileFields: ["image"],
    beforeUpdate: async ({ req, document, Model }) => {
        if (
            req.body.sortOrder &&
            Number(req.body.sortOrder) !== document.sortOrder
        ) {
            const targetOrder = Number(req.body.sortOrder);

            if (targetOrder < document.sortOrder) {
                await Model.updateMany(
                    {
                        sortOrder: {
                            $gte: targetOrder,
                            $lt: document.sortOrder,
                        },
                    },
                    {
                        $inc: { sortOrder: 1 },
                    }
                );
            }

            if (targetOrder > document.sortOrder) {
                await Model.updateMany(
                    {
                        sortOrder: {
                            $gt: document.sortOrder,
                            $lte: targetOrder,
                        },
                    },
                    {
                        $inc: { sortOrder: -1 },
                    }
                );
            }
        }
    },
});

// Delete category
exports.deleteCategory = deleteOne(Category, {
    modelName: "Category",
    fileFields: ["image"],
});