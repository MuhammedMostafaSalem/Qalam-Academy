const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
} = require("../../utils/crudFactory");
const Course = require("./course.model");

// Create course
exports.createCourse = createOne(Course, {
    modelName: "Course",
    fileFields: ["thumbnail", "trailerVideo"],
    translatableFields: [
        "title",
        "description",
    ],
    beforeCreate: async ({ req }) => {
        req.body.isPublished = false;
        req.body.isFeatured = false;
    },
});

// Get all courses
exports.getCourses = getAll(Course, {
    modelName: "Courses",
    searchFields: [
        "title.en",
        "title.ar",
        "description.en",
        "description.ar",
        "tags",
    ],
    translatableFields: [
        "title",
        "description",
    ],
    populate: [
        {
            path: "category",
            select: "title slug",
        },
        {
            path: "instructor",
            select: "firstName lastName email avatar",
        },
    ],
    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// Get one course
exports.getCourse = getOne(Course, {
    modelName: "Course",
    translatableFields: [
        "title",
        "description",
    ],
    populate: [
        {
            path: "category",
            select: "title slug",
        },
        {
            path: "instructor",
            select: "firstName lastName email avatar bio",
        },
    ],
});

// Update course
exports.updateCourse = updateOne(Course, {
    modelName: "Course",
    fileFields: ["thumbnail", "trailerVideo"],
    translatableFields: [
        "title",
        "description",
    ],
    beforeUpdate: async ({ req }) => {
        if (req.body.isPublished !== undefined) {
            req.body.isPublished = req.body.isPublished;
        }

        if (req.body.isFeatured !== undefined) {
            req.body.isFeatured = req.body.isFeatured;
        }
    },
});

// Delete course
exports.deleteCourse = deleteOne(Course, {
    modelName: "Course",
    fileFields: ["thumbnail", "trailerVideo"],
});