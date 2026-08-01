const Settings = require("./settings.model");

// Create default settings document if it doesn't exist
exports.initializeSettings = async () => {
    return await Settings.findOneAndUpdate(
        {
            singleton: true,
        },
        {
            $setOnInsert: {
                singleton: true,
            },
        },
        {
            returnDocument: "after",
            upsert: true,
        }
    );
}

/// Get Settings
exports.getSettings = async () => {
    return await exports.initializeSettings();
}

// Update Settings
exports.updateSettings = async (data, userId) => {
    const settings = await exports.initializeSettings();

    Object.assign(settings, data);

    settings.updatedBy = userId;

    await settings.save();

    return settings;
}