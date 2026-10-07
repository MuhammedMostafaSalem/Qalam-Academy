const mongoose = require("mongoose");
const ApiError = require("../../utils/ApiError");
const ApiFeatures = require("../../utils/ApiFeatures");
const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
} = require("../../utils/crudFactory");
const sendResponse = require("../../utils/sendResponse");
const PageSection = require("./page-section.model");
const { translatePageSections, translatePageSection } = require("./page-section.translator");
const { StatusCodes } = require("http-status-codes");

// Create Page Section
exports.createPageSection = createOne(
    PageSection,
    {
        modelName: "pageSection",
    }
);

// Get All Page Sections
exports.getAllPageSections = async (req, res, next) => {
    try {
        const filterObj = req.filterObject || {};

        const features = new ApiFeatures(
            PageSection,
            req.query,
            filterObj
        )
            .search([
                "page",
                "section",
            ])
            .filter()
            .sort("-createdAt")
            .select()
            .loadMore(20);

        await features.buildMeta();

        const documents = await features.query;

        const translatedDocuments = translatePageSections(
            documents,
            req.language
        );

        return sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: req.t("pageSection.fetched"),
            data: translatedDocuments,
            meta: features.meta,
        });
    } catch (error) {
        next(error);
    }
};

// Get One Page Section
exports.getPageSection = async (req, res, next) => {
    try {

        const identifier = req.params.id;

        const isId = mongoose.Types.ObjectId.isValid(identifier);

        let query;

        if (isId) {
            query = PageSection.findOne({
                $or: [
                    {
                        _id: identifier,
                    },
                    {
                        slug: identifier,
                    },
                ],
            });
        } else {
            query = PageSection.findOne({
                slug: identifier,
            });
        }

        const document = await query;

        if (!document) {
            throw new ApiError(
                req.t("pageSection.notFound"),
                StatusCodes.NOT_FOUND
            );
        }

        const translatedDocument = translatePageSection(
            document,
            req.language
        );

        return sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: req.t("pageSection.fetched"),
            data: translatedDocument,
        });
    } catch (error) {
        next(error);
    }
};

// Update Page Section
exports.updatePageSection = updateOne(
    PageSection,
    {
        modelName: "pageSection",
    }
);

// Delete Page Section
exports.deletePageSection = deleteOne(
    PageSection,
    {
        modelName: "pageSection",
    }
);