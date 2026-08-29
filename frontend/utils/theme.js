export function hexToRgb(hex) {
    if (typeof hex !== "string") return null;
    const value = hex.trim().replace("#", "");
    const normalized = value.length === 3
        ? value.split("").map((part) => `${part}${part}`).join("")
        : value;

    if (!/^[A-Fa-f0-9]{6}$/.test(normalized)) return null;

    return {
        r: parseInt(normalized.slice(0, 2), 16),
        g: parseInt(normalized.slice(2, 4), 16),
        b: parseInt(normalized.slice(4, 6), 16),
    };
}

export function getRelativeLuminance(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const channel = (value) => {
        const normalized = value / 255;
        return normalized <= 0.03928
            ? normalized / 12.92
            : ((normalized + 0.055) / 1.055) ** 2.4;
    };

    return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

export function getContrastRatio(firstColor, secondColor) {
    const first = getRelativeLuminance(firstColor);
    const second = getRelativeLuminance(secondColor);
    if (first === null || second === null) return null;

    const lighter = Math.max(first, second);
    const darker = Math.min(first, second);
    return (lighter + 0.05) / (darker + 0.05);
}

export function getContrastLabel(ratio, isEnglish = true) {
    if (ratio === null) return isEnglish ? "Invalid colors" : "ألوان غير صالحة";
    if (ratio >= 7) return isEnglish ? "AAA" : "AAA";
    if (ratio >= 4.5) return isEnglish ? "AA" : "AA";
    if (ratio >= 3) return isEnglish ? "Large text only" : "للنص الكبير فقط";
    return isEnglish ? "Needs improvement" : "يحتاج إلى تحسين";
}
