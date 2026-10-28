
const Lesson = require("../lesson/lesson.model");
const Course = require("./course.model");

const updateCourseStats = async (courseId) => {
    if (!courseId) return;

    const [stats] = await Lesson.aggregate([
        {
            $match: {
                course: courseId,
                isPublished: true,
            },
        },
        {
            $group: {
                _id: null,
                totalLessons: { $sum: 1 },
                duration: {
                    $sum: { $ifNull: ["$duration", 0] },
                },
            },
        },
    ]);

    await Course.updateOne(
        { _id: courseId },
        {
            $set: {
                totalLessons: stats?.totalLessons ?? 0,
                duration: stats?.duration ?? 0,
            },
        },
    );
};

module.exports = updateCourseStats;
