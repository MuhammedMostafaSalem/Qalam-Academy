// const mongoose = require('mongoose');
// const Course = require('../course/course.model');

// const reviewSchema = new mongoose.Schema({
//     review: {
//         type: String,
//         required: [true, 'Review text is required'],
//     },
//     rating: {
//         type: Number,
//         min: 1,
//         max: 5,
//         required: [true, 'Rating is required'],
//     },
//     user: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'User',
//         required: [true, 'Review must belong to a user'],
//     },
//     course: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'Course',
//         required: [true, 'Review must belong to a course'],
//     },
// }, {
//     timestamps: true,
// });

// // Populate أوتوماتيك لبيانات المستخدم
// reviewSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'user',
//         select: 'name profileImg avatar',
//     });

//     next();
// });

// // دالة لحساب متوسط تقييمات الكورس وعددها وتحديثها في موديل الكورس
// reviewSchema.statics.calcAverageRatingsAndQuantity = async function (courseId) {
//     const result = await this.aggregate([
//         { $match: { course: courseId } },
//         {
//             $group: {
//                 _id: '$course',
//                 nRatings: { $sum: 1 },
//                 avgRating: { $avg: '$rating' },
//             },
//         },
//     ]);

//     if (result.length > 0) {
//         await Course.findByIdAndUpdate(courseId, {
//             ratingsAverage: result[0].avgRating,
//             ratingsQuantity: result[0].nRatings,
//         });
//     } else {
//         await Course.findByIdAndUpdate(courseId, {
//             ratingsAverage: 0,
//             ratingsQuantity: 0,
//         });
//     }
// }

// reviewSchema.post('save', async function () {
//     await this.constructor.calcAverageRatingsAndQuantity(this.course);
// });

// // للتعامل مع الحذف في حال استخدام remove أو findOneAndDelete
// reviewSchema.post('findOneAndDelete', async function (doc) {
//     if (doc) {
//         await doc.constructor.calcAverageRatingsAndQuantity(doc.course);
//     }
// });

// const Review = mongoose.model('Review', reviewSchema);

// module.exports = Review;

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
            index: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        comment: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },
    },
    {
        timestamps: true,
    }
);

// المستخدم يعمل Review واحد فقط لكل كورس
reviewSchema.index(
    {
        user: 1,
        course: 1,
    },
    {
        unique: true,
    }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;