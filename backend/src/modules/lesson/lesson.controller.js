const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
} = require("../../utils/crudFactory");
const Lesson = require("./lesson.model");

// Create lesson
exports.createLesson = createOne(Lesson, {
    modelName: "Lesson",
    fileFields: [
        "thumbnail",
        "video",
        "attachment",
    ],
    beforeCreate: async ({ req, Model }) => {
        const lastLesson = await Model
            .findOne({
                course: req.body.course,
            })
            .sort("-sortOrder");

        req.body.sortOrder = lastLesson
            ? lastLesson.sortOrder + 1
            : 1;

        req.body.isPublished = false;
        req.body.isPreview = false;
    },
});

// Get all lessons
exports.getLessons = getAll(Lesson, {
    modelName: "Lessons",

    searchFields: [
        "title",
        "description",
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