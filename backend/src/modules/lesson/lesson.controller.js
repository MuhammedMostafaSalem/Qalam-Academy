
const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
} = require("../../utils/crudFactory");

const Lesson = require("./lesson.model");
const Course = require("../course/course.model");
const ApiError = require("../../utils/ApiError");
const { StatusCodes } = require("http-status-codes");

// ========================================
// Helpers
// ========================================

// قراءة المحتوى المترجم من:
// content.ar / content.en
// أو content[ar] / content[en]
// أو contentAr / contentEn من FormData
const getContentValue = (body, language, fallback = "") => {
    const formDataKey = language === "ar" ? "contentAr" : "contentEn";

    const value =
        body.content?.[language] ??
        body[`content[${language}]`] ??
        body[formDataKey];

    if (value === undefined || value === null) {
        return fallback;
    }

    return String(value);
};

// التحقق من أن رابط YouTube تابع ليوتيوب
const isValidYouTubeUrl = (value) => {
    if (!value || typeof value !== "string") {
        return false;
    }

    try {
        const url = new URL(value.trim());
        const hostname = url.hostname.toLowerCase().replace(/^www\./, "");

        if (hostname === "youtu.be") {
            return Boolean(url.pathname.split("/").filter(Boolean)[0]);
        }

        if (
            hostname === "youtube.com" ||
            hostname === "m.youtube.com" ||
            hostname === "music.youtube.com"
        ) {
            const isWatchUrl =
                url.pathname === "/watch" &&
                Boolean(url.searchParams.get("v"));

            const isEmbedUrl = /^\/(embed|shorts|live)\/[^/]+/.test(
                url.pathname,
            );

            return isWatchUrl || isEmbedUrl;
        }

        return false;
    } catch {
        return false;
    }
};

// ========================================
// Create lesson
// ========================================

exports.createLesson = createOne(Lesson, {
    modelName: "lesson",

    fileFields: ["thumbnail", "video", "attachment"],

    translatableFields: ["title", "description", "content"],

    beforeCreate: async ({ req, Model }) => {
        const contentType = req.body.contentType || "video";

        // Validate content type
        if (!["video", "text"].includes(contentType)) {
            throw new ApiError(
                "Invalid lesson content type.",
                StatusCodes.BAD_REQUEST,
            );
        }

        req.body.contentType = contentType;

        // Read localized text content
        const content = {
            ar: getContentValue(req.body, "ar").trim(),
            en: getContentValue(req.body, "en").trim(),
        };

        // ----------------------------
        // Text lesson
        // ----------------------------

        if (contentType === "text") {
            if (!content.ar && !content.en) {
                throw new ApiError(
                    "Text lesson content is required.",
                    StatusCodes.BAD_REQUEST,
                );
            }

            req.body.content = content;

            // Text lessons must not have video sources
            req.body.video = null;
            req.body.videoYoutube = null;
        }

        // ----------------------------
        // Video lesson
        // ----------------------------

        if (contentType === "video") {
            const hasVideoFile = Boolean(req.body.video);
            const youtubeUrl =
                typeof req.body.videoYoutube === "string"
                    ? req.body.videoYoutube.trim()
                    : "";

            if (!hasVideoFile && !youtubeUrl) {
                throw new ApiError(
                    "A video file or YouTube URL is required.",
                    StatusCodes.BAD_REQUEST,
                );
            }

            if (youtubeUrl && !isValidYouTubeUrl(youtubeUrl)) {
                throw new ApiError(
                    "Please provide a valid YouTube URL.",
                    StatusCodes.BAD_REQUEST,
                );
            }

            if (youtubeUrl) {
                // Use the YouTube source instead of an uploaded file
                req.body.videoYoutube = youtubeUrl;
                req.body.video = null;
            }

            // Video lessons do not need text content
            req.body.content = {
                ar: "",
                en: "",
            };
        }

        // ----------------------------
        // Validate course
        // ----------------------------

        const course = await Course.findById(req.body.course);

        if (!course) {
            throw new ApiError(
                "Course not found.",
                StatusCodes.NOT_FOUND,
            );
        }

        // Keep the existing lesson ordering behavior
        const lessonsCount = await Model.countDocuments({
            course: req.body.course,
        });

        req.body.sortOrder = lessonsCount + 1;

        // The first lesson is a preview
        req.body.isPreview = lessonsCount === 0;
    },
});

// ========================================
// Get all lessons
// ========================================

exports.getLessons = getAll(Lesson, {
    modelName: "lesson",

    searchFields: [
        "title.en",
        "title.ar",
        "description.en",
        "description.ar",
    ],

    translatableFields: [
        "title",
        "description",
        "content",
        "course.title",
    ],

    populate: [
        {
            path: "course",
            select: "title slug",
        },
    ],

    defaultLimit: 10,
    defaultSort: "sortOrder",
});

// ========================================
// Get one lesson
// ========================================

exports.getLesson = getOne(Lesson, {
    modelName: "lesson",

    translatableFields: [
        "title",
        "description",
        "content",
        "course.title",
    ],

    populate: [
        {
            path: "course",
            select: "title slug",
        },
    ],
});

// ========================================
// Update lesson
// ========================================

exports.updateLesson = updateOne(Lesson, {
    modelName: "lesson",

    fileFields: ["thumbnail", "video", "attachment"],

    translatableFields: ["title", "description", "content"],

    beforeUpdate: async ({ req, document, Model }) => {
        const contentType =
            req.body.contentType || document.contentType || "video";

        // Validate content type
        if (!["video", "text"].includes(contentType)) {
            throw new ApiError(
                "Invalid lesson content type.",
                StatusCodes.BAD_REQUEST,
            );
        }

        req.body.contentType = contentType;

        // Preserve existing language content when a field
        // is not included in the PATCH request
        const content = {
            ar: getContentValue(
                req.body,
                "ar",
                document.content?.ar || "",
            ).trim(),

            en: getContentValue(
                req.body,
                "en",
                document.content?.en || "",
            ).trim(),
        };

        if (req.body.clearLearningPoints === true) {
            document.learningPoints = [];
        }

        delete req.body.clearLearningPoints;

        const hasUploadedVideo = Boolean(
            req.files?.video &&
                (Array.isArray(req.files.video)
                    ? req.files.video.length > 0
                    : true),
        );

        const hasVideoPath =
            typeof req.body.video === "string" &&
            req.body.video.trim().length > 0;

        const youtubeUrl =
            typeof req.body.videoYoutube === "string"
                ? req.body.videoYoutube.trim()
                : "";

        // ----------------------------
        // Text lesson
        // ----------------------------

        if (contentType === "text") {
            if (!content.ar && !content.en) {
                throw new ApiError(
                    "Text lesson content is required.",
                    StatusCodes.BAD_REQUEST,
                );
            }

            req.body.content = content;

            // Remove references to video sources
            req.body.video = null;
            req.body.videoYoutube = null;
        }

        // ----------------------------
        // Video lesson
        // ----------------------------

        if (contentType === "video") {
            const switchingToVideo = document.contentType !== "video";

            const existingVideoFile = Boolean(document.video);
            const existingYoutubeUrl = document.videoYoutube || "";

            let finalVideoFile = existingVideoFile;
            let finalYoutubeUrl = existingYoutubeUrl;

            if (hasUploadedVideo || hasVideoPath) {
                // A newly uploaded file takes precedence over the old URL
                finalVideoFile = true;
                finalYoutubeUrl = "";
            } else if (youtubeUrl) {
                // A newly supplied URL takes precedence over the old file
                if (!isValidYouTubeUrl(youtubeUrl)) {
                    throw new ApiError(
                        "Please provide a valid YouTube URL.",
                        StatusCodes.BAD_REQUEST,
                    );
                }

                finalVideoFile = false;
                finalYoutubeUrl = youtubeUrl;
            } else if (req.body.videoYoutube === "") {
                // An explicitly cleared URL must not silently remain active
                finalYoutubeUrl = "";
            }

            // Switching from text to video requires a new video source
            if (
                switchingToVideo &&
                !hasUploadedVideo &&
                !hasVideoPath &&
                !youtubeUrl
            ) {
                finalVideoFile = false;
                finalYoutubeUrl = "";
            }

            if (!finalVideoFile && !finalYoutubeUrl) {
                throw new ApiError(
                    "A video file or YouTube URL is required.",
                    StatusCodes.BAD_REQUEST,
                );
            }

            if (finalYoutubeUrl) {
                if (!isValidYouTubeUrl(finalYoutubeUrl)) {
                    throw new ApiError(
                        "Please provide a valid YouTube URL.",
                        StatusCodes.BAD_REQUEST,
                    );
                }

                req.body.videoYoutube = finalYoutubeUrl;
                req.body.video = null;
            } else if (hasUploadedVideo || hasVideoPath) {
                req.body.videoYoutube = null;
            } else {
                // Keep the existing video file when no new source was sent
                delete req.body.video;
                delete req.body.videoYoutube;
            }

            // Clear text content when the lesson is a video
            req.body.content = {
                ar: "",
                en: "",
            };
        }

        // ----------------------------
        // Reorder lessons
        // ----------------------------

        if (
            req.body.sortOrder !== undefined &&
            req.body.sortOrder !== "" &&
            Number(req.body.sortOrder) !== document.sortOrder
        ) {
            const targetOrder = Number(req.body.sortOrder);

            if (!Number.isInteger(targetOrder) || targetOrder < 1) {
                throw new ApiError(
                    "Invalid lesson sort order.",
                    StatusCodes.BAD_REQUEST,
                );
            }

            if (targetOrder < document.sortOrder) {
                await Model.updateMany(
                    {
                        course: document.course,
                        sortOrder: {
                            $gte: targetOrder,
                            $lt: document.sortOrder,
                        },
                    },
                    {
                        $inc: {
                            sortOrder: 1,
                        },
                    },
                );
            }

            if (targetOrder > document.sortOrder) {
                await Model.updateMany(
                    {
                        course: document.course,
                        sortOrder: {
                            $gt: document.sortOrder,
                            $lte: targetOrder,
                        },
                    },
                    {
                        $inc: {
                            sortOrder: -1,
                        },
                    },
                );
            }

            req.body.sortOrder = targetOrder;
        }

        // ----------------------------
        // Boolean fields
        // ----------------------------

        if (req.body.isPublished !== undefined) {
            req.body.isPublished =
                req.body.isPublished === true ||
                req.body.isPublished === "true";
        }

        if (req.body.isPreview !== undefined) {
            req.body.isPreview =
                req.body.isPreview === true ||
                req.body.isPreview === "true";
        }
    },
});

// ========================================
// Delete lesson
// ========================================

exports.deleteLesson = deleteOne(Lesson, {
    modelName: "lesson",

    fileFields: ["thumbnail", "video", "attachment"],
});
