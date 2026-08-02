const { StatusCodes } = require("http-status-codes");
const Journey = require("./journey.model");
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const translateDocument = require("../../utils/translateDocument");
const handleUploadedFiles = require("../../utils/handleUploadedFiles");

const TRANSLATABLE_FIELDS = [
    "title",
    "description",
    "badge",
    "badgeDescription",
];

// إنشاء الـ Singleton لو مش موجود
const initializeJourney = async () => {
    let journey = await Journey.findOne({ singleton: true });

    if (!journey) {
        journey = await Journey.create({});
    }

    return journey;
};

// GET /journey
exports.getJourney = catchAsync(async (req, res) => {
    const journey = await initializeJourney();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Journey fetched successfully",
        data: translateDocument(
            journey,
            req.language,
            TRANSLATABLE_FIELDS
        ),
    });
});

// PATCH /journey
exports.updateJourney = catchAsync(async (req, res) => {
    const journey = await initializeJourney();

    handleUploadedFiles({
        req,
        document: journey,
        fileFields: ["image"],
    });

    Object.assign(journey, req.body);

    journey.updatedBy = req.user._id;

    await journey.save();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Journey updated successfully",
        data: translateDocument(
            journey,
            req.language,
            TRANSLATABLE_FIELDS
        ),
    });
});