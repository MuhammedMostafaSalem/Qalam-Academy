const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../../utils/sendResponse");
const catchAsync = require('../../middlewares/catchAsync');
const User = require('../users/user.model');
const Course = require('../course/course.model');

// @desc      Add course to wishlist
// @route     POST /api/wishlist/course
// @access    Private/User
exports.addCourseToWishlist = catchAsync(async (req, res, next) => {
    const { courseId } = req.body;
    // $addToSet => add courseId to wishlist array if courseId not exits
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: { wishlist: courseId },
        },
        { new: true }
    );

    const course = await Course.findById(courseId);

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Course added successfully to your wishlist",
        data: { course: translateDocument(course, req.language, ["title", "description"]) },
    });
});

// @desc      Remove course from wishlist
// @route     DELETE /api/wishlist/course/:courseId
// @access    Private/User
exports.removeCourseFromWishlist = catchAsync(async (req, res, next) => {
    const { courseId } = req.params;
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: { wishlist: courseId },
        },
        { new: true }
    );

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Course removed successfully from your wishlist",
    });
});

const translateDocument = require('../../utils/translateDocument');

// @desc      Get logged user wishlist
// @route     GET /api/wishlist/
// @access    Private/User
exports.myWishlist = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id)
        .select('wishlist')
        .populate({
            path: 'wishlist',
            populate: [
                { path: 'instructor', select: 'firstName lastName avatar' },
                { path: 'category', select: 'title slug' }
            ]
        });

    const translatedWishlist = (user?.wishlist || []).map((course) => {
        return translateDocument(course, req.language, [
            'title',
            'description',
            'category.title',
        ]);
    });

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Wishlist fetched successfully",
        data: translatedWishlist,
    });
});