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
    beforeCreate: async ({ req }) => {
        req.body.isPublished = false;
        req.body.isFeatured = false;
    },
});

// Get all courses
exports.getCourses = getAll(Course, {
    modelName: "Courses",
    searchFields: [
        "title",
        "description",
        "tags",
    ],
    populate: [
        {
            path: "category",
            select: "title slug",
        },
        {
            path: "instructor",
            select: "username email avatar",
        },
    ],
    defaultLimit: 10,
    defaultSort: "-createdAt",
});

// Get one course
exports.getCourse = getOne(Course, {
    modelName: "Course",
    populate: [
        {
            path: "category",
            select: "title slug",
        },
        {
            path: "instructor",
            select: "username email avatar bio",
        },
    ],
});

// Update course
exports.updateCourse = updateOne(Course, {
    modelName: "Course",
    fileFields: ["thumbnail", "trailerVideo"],
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