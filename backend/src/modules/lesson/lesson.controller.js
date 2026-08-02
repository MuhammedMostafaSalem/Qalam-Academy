const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
} = require("../../utils/crudFactory");
const Lesson = require("./lesson.model");
const Course = require("../course/course.model");
const ApiError = require("../../utils/ApiError");
const { StatusCodes } = require("http-status-codes");

// Create lesson
exports.createLesson = createOne(Lesson, {
    modelName: "Lesson",
    fileFields: [
        "thumbnail",
        "video",
        "attachment",
    ],
    translatableFields: [
        "title",
        "description",
    ],
    beforeCreate: async ({ req, Model }) => {
        const course = await Course.findById(req.body.course);
        if (!course) {
            throw new ApiError(
                "Course not found.",
                StatusCodes.NOT_FOUND
            );
        }

        const lastLesson = await Model
            .findOne({
                course: req.body.course,
            })
            .sort("-sortOrder");

        req.body.sortOrder = lastLesson
            ? lastLesson.sortOrder + 1
            : 1;

        const lessonsCount = await Model.countDocuments({
            course: req.body.course,
        });

        req.body.sortOrder = lessonsCount + 1;

        // أول درس فقط Preview
        req.body.isPreview = lessonsCount === 0;
    },
});

// Get all lessons
exports.getLessons = getAll(Lesson, {
    modelName: "Lessons",

    searchFields: [
        "title.en",
        "title.ar",
        "description.en",
        "description.ar"
    ],

    translatableFields: [
        "title",
        "description",
        "course.title",
    ],

    populate: [
        {
            path: "course",
            select: "title slug",
        },
    ],

    defaultLimit: 10,
    defaultSort: "sortOrder",
});

// Get one lesson
exports.getLesson = getOne(Lesson, {
    modelName: "Lesson",

    translatableFields: [
        "title",
        "description",
    ],

    populate: [
        {
            path: "course",
            select: "title slug",
        },
    ],
});

// Update lesson
exports.updateLesson = updateOne(Lesson, {
    modelName: "Lesson",

    fileFields: [
        "thumbnail",
        "video",
        "attachment",
    ],

    translatableFields: [
        "title",
        "description",
    ],

    beforeUpdate: async ({ req, document, Model }) => {
        // Reorder lessons inside the same course
        if (
            req.body.sortOrder &&
            Number(req.body.sortOrder) !== document.sortOrder
        ) {
            const targetOrder = Number(req.body.sortOrder);

            if (targetOrder < document.sortOrder) {
                await Model.updateMany(
                    {
                        course: document.course,
                        sortOrder: {
                            $gte: targetOrder,
                            $lt: document.sortOrder,
                        },
                    },
                    {
                        $inc: { sortOrder: 1 },
                    }
                );
            }

            if (targetOrder > document.sortOrder) {
                await Model.updateMany(
                    {
                        course: document.course,
                        sortOrder: {
                            $gt: document.sortOrder,
                            $lte: targetOrder,
                        },
                    },
                    {
                        $inc: { sortOrder: -1 },
                    }
                );
            }
        }

        // Edit published and preview
        if (req.body.isPublished !== undefined) {
            req.body.isPublished = req.body.isPublished;
        }

        if (req.body.isPreview !== undefined) {
            req.body.isPreview = req.body.isPreview;
        }
    },
});


// Delete lesson
exports.deleteLesson = deleteOne(Lesson, {
    modelName: "Lesson",

    fileFields: [
        "thumbnail",
        "video",
        "attachment",
    ],
});