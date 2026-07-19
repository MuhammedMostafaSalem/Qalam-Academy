const { createOne, getAll, getOne, updateOne, deleteOne } = require("../../utils/crudFactory");
const Partner = require("./partner.model");

// Create Partner
exports.createPartner = createOne(Partner, {
    modelName: "Partner",
    fileFields: ["image"],
});

// Get all Partner
exports.getPartners = getAll(Partner, {
    modelName: "Partner",
    searchFields: ["title"],
    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// Get one Partner
exports.getPartner = getOne(Partner, {
    modelName: "Partner",
});

// Update one Portfolio
exports.updatePartner = updateOne(Partner, {
    modelName: "Partner",
    fileFields: ["image"],
});

// Delete one Partner
exports.deletePartner = deleteOne(Partner, {
    modelName: "Partner",
    fileFields: ["image"],
});