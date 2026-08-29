const Settings = require("./settings.model");

const DEFAULT_THEME = {
    light: {
        primary: "#2563EB",
        secondary: "#14B8A6",
        accent: "#F59E0B",
        background: "#FFFFFF",
        surface: "#F8FAFC",
        text: "#0F172A",
        mutedText: "#64748B",
        border: "#E2E8F0",
        success: "#22C55E",
        warning: "#EAB308",
        danger: "#EF4444",
    },
    dark: {
        primary: "#3B82F6",
        secondary: "#2DD4BF",
        accent: "#FBBF24",
        background: "#020617",
        surface: "#0F172A",
        text: "#F8FAFC",
        mutedText: "#94A3B8",
        border: "#334155",
        success: "#22C55E",
        warning: "#FACC15",
        danger: "#F87171",
    },
};

const THEME_MODES = ["light", "dark"];
const PALETTE_KEYS = [
    "primary", "secondary", "accent", "background", "surface", "text",
    "mutedText", "border", "success", "warning", "danger",
];

const ensureThemeDefaults = async (settings) => {
    let changed = false;
    settings.theme = settings.theme || {};

    THEME_MODES.forEach((mode) => {
        settings.theme[mode] = settings.theme[mode] || {};

        PALETTE_KEYS.forEach((key) => {
            if (!settings.theme[mode][key]) {
                settings.theme[mode][key] = DEFAULT_THEME[mode][key];
                changed = true;
            }
        });
    });

    if (changed) await settings.save();
    return settings;
};

// Create default settings document if it doesn't exist
exports.initializeSettings = async () => {
    const settings = await Settings.findOneAndUpdate(
        {
            singleton: true,
        },
        {
            $setOnInsert: {
                singleton: true,
                theme: DEFAULT_THEME,
            },
        },
        {
            returnDocument: "after",
            upsert: true,
        }
    );

    return ensureThemeDefaults(settings);
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
