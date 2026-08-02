const { createOne, getAll, getOne, updateOne, deleteOne } = require("../../utils/crudFactory");
const Service = require("./service.model");

// Create Service
exports.createService = createOne(Service, {
    modelName: "Service",
    fileFields: ["image"],
    translatableFields: [
        "title",
        "description",
    ],
});

// Get all services
exports.getServices = getAll(Service, {
    modelName: "Services",
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
    modelName: "Service",
    translatableFields: [
        "title",
        "description",
    ],
});

// Update one service
exports.updateService = updateOne(Service, {
    modelName: "Service",
    fileFields: ["image"],
    translatableFields: [
        "title",
        "description",
    ],
});

// Delete one service
exports.deleteService = deleteOne(Service, {
    modelName: "Service",
    fileFields: ["image"],
});