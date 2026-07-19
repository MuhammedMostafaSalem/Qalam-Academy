const { createOne, getAll, getOne, updateOne, deleteOne } = require("../../utils/crudFactory");
const Team = require("./team.model");

// Create Team
exports.createTeam = createOne(Team, {
    modelName: "Team",
    fileFields: ["image"],
});

// Get all teams
exports.getTeams = getAll(Team, {
    modelName: "Team",
    searchFields: ["title", "position"],
    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// Get one Team
exports.getTeam = getOne(Team, {
    modelName: "Team",
});

// Update one Team
exports.updateTeam = updateOne(Team, {
    modelName: "Team",
    fileFields: ["image"],
});

// Delete one team
exports.deleteTeam = deleteOne(Team, {
    modelName: "Team",
    fileFields: ["image"],
});