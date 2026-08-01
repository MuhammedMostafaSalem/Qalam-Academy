const Hero = require("./hero.model");
const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
} = require("../../utils/crudFactory");


// Create Hero
exports.createHero = createOne(Hero, {
    modelName: "Hero",

    fileFields: [
        "image",
        "backgroundImage",
        "video",
    ],

    beforeCreate: async ({ req }) => {
        req.body.isActive ??= true;
        req.body.sortOrder ??= 1;
    },
});

// Get All Heroes (Admin)
exports.getHeroes = getAll(Hero, {
    modelName: "Heroes",

    searchFields: [
        "title",
        "subtitle",
        "description",
        "page",
    ],

    defaultLimit: 20,
    defaultSort: "sortOrder",
});

// Get Hero By ID
exports.getHero = getOne(Hero, {
    modelName: "Hero",
});

// Update Hero
exports.updateHero = updateOne(Hero, {
    modelName: "Hero",

    fileFields: [
        "image",
        "backgroundImage",
        "video",
    ],

    beforeUpdate: async ({ req }) => {
        if (req.body.isActive !== undefined) {
            req.body.isActive = req.body.isActive;
        }

        if (req.body.sortOrder !== undefined) {
            req.body.sortOrder = Number(req.body.sortOrder);
        }
    },
});

// Delete Hero
exports.deleteHero = deleteOne(Hero, {
    modelName: "Hero",

    fileFields: [
        "image",
        "backgroundImage",
        "video",
    ],
});

// Public Hero By Page
exports.getHeroByPage = async (page) => {
    return await Hero.findOne({
        page,
        isActive: true,
    });
};