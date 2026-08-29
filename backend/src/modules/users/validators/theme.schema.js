const { z } = require("zod");

const updateThemeModeSchema = z.object({
    themeMode: z.enum(["light", "dark"]),
}).strict();

module.exports = {
    updateThemeModeSchema,
};
