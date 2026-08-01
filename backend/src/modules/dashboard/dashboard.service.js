const User = require("../users/user.model");
const Course = require("../course/course.model");
const Lesson = require("../lesson/lesson.model");
const Product = require("../products/product.model");
const Order = require("../order/orders.model");
const Review = require("../review/review.model");
const Enrollment = require("../enrollment/enrollment.model");


// Revenue Chart
exports.getRevenueChart = async () => {
    return await Order.aggregate([
        {
            $match: {
                isPaid: true,
            },
        },
        {
            $group: {
                _id: {
                    year: {
                        $year: "$paidAt",
                    },
                    month: {
                        $month: "$paidAt",
                    },
                },

                revenue: {
                    $sum: "$totalOrderPrice",
                },

                orders: {
                    $sum: 1,
                },
            },
        },

        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
            },
        },
    ]);
}

// Orders Chart
exports.getOrdersChart = async () => {
    return await Order.aggregate([
        {
            $group: {
                _id: "$status",
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
}

// Enrollments Chart
exports.getEnrollmentsChart = async () => {
    return await Enrollment.aggregate([
        {
            $group: {
                _id: {
                    year: {
                        $year: "$createdAt",
                    },

                    month: {
                        $month: "$createdAt",
                    },
                },

                students: {
                    $sum: 1,
                },
            },
        },

        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
            },
        },
    ]);
}

// Top Courses
exports.getTopCourses = async () => {
    return await Course.find()

        .sort({
            totalStudents: -1,
            averageRating: -1,
        })

        .limit(10)

        .select(
            "title slug thumbnail totalStudents averageRating"
        );
}

// Top Instructors
exports.getTopInstructors = async () => {
    return await User.aggregate([
        {
            $match: {
                role: "instructor",
            },
        },

        {
            $lookup: {
                from: "courses",
                localField: "_id",
                foreignField: "instructor",
                as: "courses",
            },
        },

        {
            $project: {
                firstName: 1,
                lastName: 1,
                avatar: 1,

                totalCourses: {
                    $size: "$courses",
                },

                totalStudents: {
                    $sum: "$courses.totalStudents",
                },
            },
        },

        {
            $sort: {
                totalStudents: -1,
            },
        },

        {
            $limit: 10,
        },
    ]);
}

// Admin Dashboard
exports.getAdminDashboard = async () => {
    const [
        totalUsers,
        totalStudents,
        totalInstructors,
        totalCourses,
        totalLessons,
        totalProducts,
        totalOrders,
        totalEnrollments,
        totalReviews,
        revenue,

        latestOrders,
        latestStudents,
        latestCourses,
        latestReviews,
    ] = await Promise.all([

        User.countDocuments(),

        User.countDocuments({
            role: "student",
        }),

        User.countDocuments({
            role: "instructor",
        }),

        Course.countDocuments(),

        Lesson.countDocuments(),

        Product.countDocuments(),

        Order.countDocuments(),

        Enrollment.countDocuments(),

        Review.countDocuments(),

        Order.aggregate([
            {
                $match: {
                    isPaid: true,
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalOrderPrice",
                    },
                },
            },
        ]),

        Order.find()
            .sort("-createdAt")
            .limit(10)
            .populate("user", "firstName lastName email"),

        User.find({
            role: "student",
        })
            .sort("-createdAt")
            .limit(10)
            .select("firstName lastName avatar email"),

        Course.find()
            .sort("-createdAt")
            .limit(10)
            .populate("instructor", "firstName lastName"),

        Review.find()
            .sort("-createdAt")
            .limit(10)
            .populate("user", "firstName lastName")
            .populate("course", "title"),
    ]);

    return {
        overview: {
            totalUsers,
            totalStudents,
            totalInstructors,
            totalCourses,
            totalLessons,
            totalProducts,
            totalOrders,
            totalEnrollments,
            totalReviews,
            totalRevenue: revenue[0]?.total || 0,
        },

        latestOrders,
        latestStudents,
        latestCourses,
        latestReviews,

        charts: {
            revenue: await exports.getRevenueChart(),
            orders: await exports.getOrdersChart(),
            enrollments: await exports.getEnrollmentsChart(),
        },

        topCourses: await exports.getTopCourses(),

        topInstructors: await exports.getTopInstructors(),
    };
}

// Instructor Dashboard
exports.getInstructorDashboard = async (instructorId) => {
    const courses = await Course.find({
        instructor: instructorId,
    }).select("_id");

    const courseIds = courses.map(course => course._id);

    const [
        totalCourses,
        totalLessons,
        totalStudents,
        totalReviews,

        ratings,

        latestStudents,
        latestReviews,
    ] = await Promise.all([

        Course.countDocuments({
            instructor: instructorId,
        }),

        Lesson.countDocuments({
            course: {
                $in: courseIds,
            },
        }),

        Enrollment.countDocuments({
            course: {
                $in: courseIds,
            },
        }),

        Review.countDocuments({
            course: {
                $in: courseIds,
            },
        }),

        Course.aggregate([
            {
                $match: {
                    instructor: instructorId,
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$averageRating",
                    },
                },
            },
        ]),

        Enrollment.find({
            course: {
                $in: courseIds,
            },
        })
            .sort("-createdAt")
            .limit(10)
            .populate("user", "firstName lastName avatar")
            .populate("course", "title"),

        Review.find({
            course: {
                $in: courseIds,
            },
        })
            .sort("-createdAt")
            .limit(10)
            .populate("user", "firstName lastName")
            .populate("course", "title"),
    ]);

    return {
        overview: {
            totalCourses,
            totalLessons,
            totalStudents,
            totalReviews,
            averageRating: ratings[0]?.averageRating || 0,
        },

        latestStudents,
        latestReviews,
    };
}

// Student Dashboard
exports.getStudentDashboard = async (userId) => {
    const [
        enrollments,
        completedCourses,
        wishlistCount,
    ] = await Promise.all([

        Enrollment.find({
            user: userId,
        }).populate("course", "title thumbnail slug"),

        Enrollment.countDocuments({
            user: userId,
            isCompleted: true,
        }),

        User.findById(userId)
            .select("wishlist"),
    ]);

    const averageProgress =
        enrollments.length === 0
            ? 0
            : (
                enrollments.reduce(
                    (sum, enrollment) => sum + enrollment.progress,
                    0
                ) / enrollments.length
            );

    return {
        overview: {
            totalCourses: enrollments.length,
            completedCourses,
            wishlist: wishlistCount?.wishlist?.length || 0,
            averageProgress: Number(
                averageProgress.toFixed(2)
            ),
        },

        continueLearning: enrollments,
    };
}