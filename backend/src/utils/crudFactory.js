const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("./ApiError");
const ApiFeatures = require("./ApiFeatures");
const deleteFile = require("./deleteFile");
const generateFileUrl = require("./generateFileUrl");
const handleUploadedFiles = require("./handleUploadedFiles");
const sendResponse = require("./sendResponse");
const { StatusCodes } = require("http-status-codes");
const translateDocument = require("./translateDocument");
const translateDocuments = require("./translateDocuments");

// Create One
exports.createOne = (
    Model,
    {
        modelName = "Document",
        fileFields = [],
        beforeCreate = null,
        afterCreate = null,
        translatableFields = [],
    } = {}
) =>
    catchAsync(async (req, res) => {
        // Handle uploaded files
        handleUploadedFiles({ req, fileFields });

        // createdBy
        if (req.user?.id) req.body.createdBy = req.user.id;

        // Execute custom logic before create
        if (beforeCreate) {
            await beforeCreate({
                req,
                Model,
            });
        }

        const document = await Model.create(req.body);

        // Execute custom logic after create
        if (afterCreate) {
            await afterCreate({
                req,
                document,
                Model,
            });
        }

        return sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: `${modelName} created successfully`,
            data: translateDocument(
                document,
                req.language,
                translatableFields
            ),
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
        translatableFields = [],
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
        statusCode: StatusCodes.OK,
        success: true,
        message: `${modelName} fetched successfully`,
        data: translateDocuments(
            documents,
            req.language,
            translatableFields
        ),
        meta: features.meta,
    });
});

// Get One
exports.getOne = (
    Model,
    {
        modelName = "Document",
        populate = null,
        translatableFields = [],
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

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `${modelName} fetched successfully`,
        data: translateDocument(
            document,
            req.language,
            translatableFields
        ),
    });
});

// Update One
exports.updateOne = (
    Model,
    {
        modelName = "Document",
        fileFields = [],
        beforeUpdate = null,
        afterUpdate = null,
        translatableFields = [],
    } = {}
) =>
    catchAsync(async (req, res) => {
        const document = await Model.findById(req.params.id);

        if (!document) throw new ApiError(`${modelName} not found.`, StatusCodes.NOT_FOUND);

        // Handle uploaded files
        handleUploadedFiles({
            req,
            document,
            fileFields,
        });

        // Execute custom logic before update
        if (beforeUpdate) {
            await beforeUpdate({
                req,
                document,
                Model,
            });
        }

        Object.assign(document, req.body);
        // const updatedDocument = await Model.findByIdAndUpdate(
        //     req.params.id,
        //     req.body,
        //     {
        //         new: true,
        //         runValidators: true,
        //     }
        // );

        await document.save();

        // Execute custom logic after update
        if (afterUpdate) {
            await afterUpdate({
                req,
                document,
                Model,
            });
        }

        return sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: `${modelName} updated successfully`,
            data: translateDocument(
                document,
                req.language,
                translatableFields
            ),
        });
    });

// Delete One
exports.deleteOne = (
    Model,
    {
        modelName = "Document",
        fileFields = [],
        afterDelete = null,
    } = {}
) =>
    catchAsync(async (req, res) => {
        const document = await Model.findById(req.params.id);

        if (!document) throw new ApiError(`${modelName} not found.`, StatusCodes.NOT_FOUND);

        fileFields.forEach(field => {
            if (!document[field]) return;

            if (Array.isArray(document[field])) {
                document[field].forEach(file => {
                    deleteFile(file);
                });
            } else {
                deleteFile(document[field]);
            }
        });

        await document.deleteOne();

        // Execute custom logic after deleting response
        if (afterDelete) {
            await afterDelete({
                req,
                document,
                Model,
            });
        }

        return sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: `${modelName} deleted successfully`,
            data: null,
        });
    });