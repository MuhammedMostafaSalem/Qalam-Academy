const { createOne, getAll, getOne, updateOne, deleteOne } = require("../../utils/crudFactory");
const Team = require("./team.model");

// Create team
exports.createTeam = createOne(Team, {
    modelName: "Team",
});

// Get all team members
exports.getTeams = getAll(Team, {
    modelName: "Team",
    searchFields: ["position"],
    populate: {
        path: "user",
        select: "username slug email avatar",
    },
});

// Get one team member
exports.getTeam = getOne(Team, {
    modelName: "Team",
    populate: {
        path: "user",
        select: "username slug email avatar",
    },
});

// Update team member
exports.updateTeam = updateOne(Team, {
    modelName: "Team",
});

// Delete team member
exports.deleteTeam = deleteOne(Team, {
    modelName: "Team",
});