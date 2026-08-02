const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
} = require("../../utils/crudFactory");

const Timeline = require("./timeline.model");

// Create Timeline
exports.createTimeline = createOne(Timeline, {
    modelName: "Timeline",

    translatableFields: [
        "title",
    ],

    beforeCreate: async ({ req, Model }) => {
        const lastTimeline = await Model
            .findOne()
            .sort("-sortOrder");

        req.body.sortOrder = lastTimeline
            ? lastTimeline.sortOrder + 1
            : 1;
    },
});

// Get All Timelines
exports.getTimelines = getAll(Timeline, {
    modelName: "Timelines",

    searchFields: [
        "title.ar",
        "title.en",
    ],

    translatableFields: [
        "title",
    ],

    defaultLimit: 20,

    defaultSort: "sortOrder",
});

// Get Timeline
exports.getTimeline = getOne(Timeline, {
    modelName: "Timeline",

    translatableFields: [
        "title",
    ],
});

// Update Timeline
exports.updateTimeline = updateOne(Timeline, {
    modelName: "Timeline",

    translatableFields: [
        "title",
    ],

    beforeUpdate: async ({
        req,
        document,
        Model,
    }) => {
        if (
            req.body.sortOrder &&
            Number(req.body.sortOrder) !== document.sortOrder
        ) {
            const targetOrder = Number(
                req.body.sortOrder
            );

            if (targetOrder < document.sortOrder) {
                await Model.updateMany(
                    {
                        sortOrder: {
                            $gte: targetOrder,
                            $lt: document.sortOrder,
                        },
                    },
                    {
                        $inc: {
                            sortOrder: 1,
                        },
                    }
                );
            }

            if (targetOrder > document.sortOrder) {
                await Model.updateMany(
                    {
                        sortOrder: {
                            $gt: document.sortOrder,
                            $lte: targetOrder,
                        },
                    },
                    {
                        $inc: {
                            sortOrder: -1,
                        },
                    }
                );
            }
        }
    },
});

// Delete Timeline
exports.deleteTimeline = deleteOne(Timeline, {
    modelName: "Timeline",
});