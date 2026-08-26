const { createOne, getAll, getOne, updateOne, deleteOne } = require("../../utils/crudFactory");
const Team = require("./team.model");

// Create team
exports.createTeam = createOne(Team, {
    modelName: "team",
});

// Get all team members
exports.getTeams = getAll(Team, {
    modelName: "team",
    searchFields: ["position"],
    populate: {
        path: "user",
        select: "firstName lastName slug email avatar",
    },
});

// Get one team member
exports.getTeam = getOne(Team, {
    modelName: "team",
    populate: {
        path: "user",
        select: "firstName lastName slug email avatar",
    },
});

// Update team member
exports.updateTeam = updateOne(Team, {
    modelName: "team",
});

// Delete team member
exports.deleteTeam = deleteOne(Team, {
    modelName: "team",
});