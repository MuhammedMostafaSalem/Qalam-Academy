const { z } = require("zod");

// 1. Basic field rules (to avoid repeating min and max)
const portfolioBaseObject = {
    title: z.string({ error: "Portfolio title is required" })
        .trim()
        .min(2, "Portfolio title must be at least 2 characters")
        .max(100, "Portfolio title must not exceed 100 characters"),

    description: z.string({ error: "Portfolio description is required" })
        .trim()
        .min(10, "Portfolio description must be at least 10 characters")
        .max(3000, "Portfolio description must not exceed 3000 characters"),

    category: z.string({ error: "Category is required" })
        .trim()
        .min(2, "Category must be at least 2 characters")
        .max(100, "Category must not exceed 100 characters"),

    projectUrl: z.string({ error: "Project URL is required" })
        .trim()
        .url("Invalid project URL")
        .optional()
        .or(z.literal("")), // allow an empty string if they don't want to provide it

    githubUrl: z.string({ error: "Github URL is required" })
        .trim()
        .url("Invalid GitHub URL")
        .optional()
        .or(z.literal("")),

    technologies: z.preprocess(
        // A smart move: If it's sent from `form-data` as a single string (for instance, if someone sent it incorrectly), we convert it into an array.
        (value) => {
            if (Array.isArray(value)) return value;

            if (typeof value === "string") {
                return value
                    .split(",")
                    .map(item => item.trim())
                    .filter(Boolean);
            }

            return [];
        },

        z.array(
            z.string()
                .trim()
                .min(1, "Technology name cannot be empty")
        ).min(1, "At least one technology is required")
    ),

    isActive: z
        .boolean()
        .optional(),
}

// 2. Creation schema (all fields are mandatory)
const createPortfolioSchema = z.object(portfolioBaseObject).strict();

// 3. The update schema (all fields are optional using .partial)
const updatePortfolioSchema = z.object(portfolioBaseObject).partial().strict();

module.exports = {
    createPortfolioSchema,
    updatePortfolioSchema,
}