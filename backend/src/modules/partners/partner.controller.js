const { createOne, getAll, getOne, updateOne, deleteOne } = require("../../utils/crudFactory");
const Partner = require("./partner.model");

// Create partner
exports.createPartner = createOne(Partner, {
    modelName: "partner",
    fileFields: ["image"],
});

// Get all partners
exports.getPartners = getAll(Partner, {
    modelName: "partner",
    searchFields: ["name"],
    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// Get one partner
exports.getPartner = getOne(Partner, {
    modelName: "partner",
});

// Update one partner
exports.updatePartner = updateOne(Partner, {
    modelName: "partner",
    fileFields: ["image"],
});

// Delete one partner
exports.deletePartner = deleteOne(Partner, {
    modelName: "partner",
    fileFields: ["image"],
});