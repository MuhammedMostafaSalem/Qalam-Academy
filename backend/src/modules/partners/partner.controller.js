const { createOne, getAll, getOne, updateOne, deleteOne } = require("../../utils/crudFactory");
const Partner = require("./partner.model");

// Create partner
exports.createPartner = createOne(Partner, {
    modelName: "Partner",
    fileFields: ["image"],
});

// Get all partners
exports.getPartners = getAll(Partner, {
    modelName: "Partners",
    searchFields: ["name"],
    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// Get one partner
exports.getPartner = getOne(Partner, {
    modelName: "Partner",
});

// Update one partner
exports.updatePartner = updateOne(Partner, {
    modelName: "Partner",
    fileFields: ["image"],
});

// Delete one partner
exports.deletePartner = deleteOne(Partner, {
    modelName: "Partner",
    fileFields: ["image"],
});