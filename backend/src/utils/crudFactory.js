const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("./ApiError");
const ApiFeatures = require("./ApiFeatures");
const sendResponse = require("./sendResponse");
const { StatusCodes } = require("http-status-codes");

// Create One
exports.createOne = (Model, modelName = "Document") =>
    catchAsync(async (req, res) => {
        const document = await Model.create(req.body);

        return sendResponse(res, {
            statusCode = StatusCodes.CREATED,
            success = true,
            message = `${modelName} created successfully.`,
            data = document,
        });
    });

// Get All
exports.getAll = (
    Model,
    {
        modelName = "Documents",
        searchFields = [],
        populate = null,
        defaultLimit = 10,
        defaultSort = "-createdAt",
    } = {}
) => catchAsync(async (req, res) => {
    const features = new ApiFeatures(Model, req.query)
        .search(searchFields)
        .filter()
        .sort(defaultSort)
        .select()
        .loadMore(defaultLimit)
        .populate(populate)

    await features.buildMeta();

    const documents = await features.query;

    return sendResponse(res, {
        statusCode = StatusCodes.OK,
        success = true,
        message = `${modelName} fetched successfully.`,
        data = documents,
        meta = features.meta,
    });
});

// Get One
exports.getOne = (
    Model,
    {
        modelName = "Document",
        populate = null,
    } = {}
) => catchAsync(async (req, res) => {
    let query = Model.findById(req.params.id);

    if (populate) {
        query = query.populate(populate);
    }

    const document = await query;

    if (!document) {
        throw new ApiError(`${modelName} not found.`, StatusCodes.NOT_FOUND);
    }

    return sendResponse(res,
        {
            statusCode = StatusCodes.OK,
            success = true,
            message = `${modelName} fetched successfully.`,
            data = document,
        });
});

// Update One
exports.updateOne = (Model, modelName = "Document") =>
    catchAsync(async (req, res) => {
        const document = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!document) {
            throw new ApiError(`${modelName} not found.`, StatusCodes.NOT_FOUND);
        }

        return sendResponse(res,
            {
                statusCode = StatusCodes.OK,
                success = true,
                message = `${modelName} updated successfully.`,
                data = document,
            });
    });

// Delete One
exports.deleteOne = (Model, modelName = "Document") =>
    catchAsync(async (req, res) => {
        const document = await Model.findByIdAndDelete(req.params.id);

        if(!document) {
            throw new ApiError(`${modelName} not found.`, StatusCodes.NOT_FOUND);
        }

        return sendResponse(res,
            {
                statusCode = StatusCodes.OK,
                success = true,
                message = `${modelName} deleted successfully.`,
                data = null,
            });
    });