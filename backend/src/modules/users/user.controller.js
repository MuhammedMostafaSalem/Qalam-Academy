const {
    getAll,
    getOne,
    updateOne,
    deleteOne
} = require("../../utils/crudFactory");
const User = require("./user.model");

// Get all users
exports.getUsers = getAll(User, {
    modelName: "Users",
    searchFields: [
        "username",
        "email",
        "role",
    ],
    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// Get one user
exports.getUser = getOne(User, {
    modelName: "User",
});

// Update user
exports.updateUser = updateOne(User, {
    modelName: "User",
    fileFields: ["avatar"],
});

// Delete user
exports.deleteUser = deleteOne(User, {
    modelName: "User",
    fileFields: ["avatar"],
});