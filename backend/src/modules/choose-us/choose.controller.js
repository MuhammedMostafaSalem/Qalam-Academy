const { StatusCodes } = require("http-status-codes");
const Choose = require("./choose.model");
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const translateDocument = require("../../utils/translateDocument");
const handleUploadedFiles = require("../../utils/handleUploadedFiles");

const TRANSLATABLE_FIELDS = [
    "title",
    "subTitle",
    "subtitle",
    "description",
];

// إنشاء الـ Singleton لو مش موجود
const initializeChoose = async () => {
    let choose = await Choose.findOne({ singleton: true });

    if (!choose) {
        choose = await Choose.create({});
    }

    return choose;
};

// GET /choose
exports.getChoose = catchAsync(async (req, res) => {
    const choose = await initializeChoose();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("choose.fetched"),
        data: translateDocument(
            choose,
            req.language,
            TRANSLATABLE_FIELDS
        ),
    });
});

// PATCH /choose
exports.updateChoose = catchAsync(async (req, res) => {
    const choose = await initializeChoose();

    handleUploadedFiles({
        req,
        document: choose,
        fileFields: ["image"],
    });

    Object.assign(choose, req.body);

    choose.updatedBy = req.user._id;

    await choose.save();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("choose.updated"),
        data: translateDocument(
            choose,
            req.language,
            TRANSLATABLE_FIELDS
        ),
    });
});