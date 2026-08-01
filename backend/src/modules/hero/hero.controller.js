const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const ApiError = require("../../utils/ApiError");
const {
    createHero,
    getHeroes,
    getHero,
    updateHero,
    deleteHero,
    getHeroByPage,
} = require("./hero.service");


// Admin CRUD
exports.createHero = createHero;

exports.getHeroes = getHeroes;

exports.getHero = getHero;

exports.updateHero = updateHero;

exports.deleteHero = deleteHero;


// Public Hero
exports.getPublicHero = catchAsync(async (req, res) => {
    const hero = await getHeroByPage(req.params.page);

    if (!hero) {
        throw new ApiError(
            "Hero not found.",
            StatusCodes.NOT_FOUND
        );
    }

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Hero fetched successfully.",
        data: hero,
    });
});