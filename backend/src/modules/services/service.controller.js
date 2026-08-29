const { createOne, getAll, getOne, updateOne, deleteOne } = require("../../utils/crudFactory");
const Service = require("./service.model");

// Create Service
exports.createService = createOne(Service, {
    modelName: "service",
    fileFields: ["image"],
    translatableFields: [
        "title",
        "description",
    ],
});

// Get all services
exports.getServices = getAll(Service, {
    modelName: "service",
    searchFields: [
        "title.en",
        "title.ar",
        "description.en",
        "description.ar"
    ],
    translatableFields: [
        "title",
        "description",
    ],
    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// Get one Service
exports.getService = getOne(Service, {
    modelName: "service",
    translatableFields: [
        "title",
        "description",
    ],
});

// Update one service
exports.updateService = updateOne(Service, {
    modelName: "service",
    fileFields: ["image"],
    translatableFields: [
        "title",
        "description",
    ],
});

// Delete one service
exports.deleteService = deleteOne(Service, {
    modelName: "service",
    fileFields: ["image"],
});