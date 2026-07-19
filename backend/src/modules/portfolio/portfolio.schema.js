const { z } = require("zod");

// 1. Basic field rules (to avoid repeating min and max)
const portfolioBaseObject = {
    title: z.string()
        .trim()
        .min(2, "Portfolio title must be at least 2 characters")
        .max(100, "Portfolio title must not exceed 100 characters"),

    description: z.string()
        .trim()
        .min(10, "Portfolio description must be at least 10 characters")
        .max(3000, "Portfolio description must not exceed 3000 characters"),

    category: z.string({ required_error: "Category is required" })
        .trim()
        .min(2, "Category must be at least 2 characters"),

    projectUrl: z.string()
        .url("Invalid project URL")
        .trim()
        .or(z.literal("")) // بنسمح بـ string فاضي لو مش عايز يحطه
        .optional(),

    githubUrl: z.string()
        .url("Invalid GitHub URL")
        .trim()
        .or(z.literal(""))
        .optional(),

    technologies: z.preprocess(
        // حركة ذكية: لو مبعوتة من الـ Form-data كـ String واحد (مثلا لو حد باعتها غلط)، بنحولها لـ Array
        (val) => (typeof val === "string" ? [val] : val),
        z.array(z.string().trim().min(1, "Technology name cannot be empty"))
            .min(1, "At least one technology must be added")
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