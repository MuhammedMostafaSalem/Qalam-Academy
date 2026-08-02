const {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
} = require("../../utils/crudFactory");

const Blog = require("./blog.model");


// Create Blog
exports.createBlog = createOne(Blog, {
    modelName: "Blog",

    fileFields: [
        "featuredImage",
        "gallery",
    ],

    translatableFields: [
        "title",
        "excerpt",
        "content",
        "seoTitle",
        "seoDescription",
    ],

    beforeCreate: async ({ req }) => {
        req.body.user = req.user._id;

        if (req.body.isPublished) {
            req.body.publishedAt = new Date();
        }
    },
});

// Get Blogs
exports.getBlogs = getAll(Blog, {
    modelName: "Blogs",

    searchFields: [
        "title.ar",
        "title.en",
        "excerpt.ar",
        "excerpt.en",
        "content.ar",
        "content.en",
    ],

    translatableFields: [
        "title",
        "excerpt",
        "content",
        "seoTitle",
        "seoDescription",
        "category.title",
    ],

    populate: [
        {
            path: "category",
            select: "title slug",
        },
        {
            path: "user",
            select: "firstName lastName avatar",
        },
    ],

    defaultLimit: 10,

    defaultSort: "-publishedAt",
});


// Get Blog
exports.getBlog = getOne(Blog, {
    modelName: "Blog",

    translatableFields: [
        "title",
        "excerpt",
        "content",
        "seoTitle",
        "seoDescription",
        "category.title",
    ],

    populate: [
        {
            path: "category",
            select: "title slug",
        },
        {
            path: "user",
            select: "firstName lastName avatar",
        },
    ],
});


// Update Blog
exports.updateBlog = updateOne(Blog, {
    modelName: "Blog",

    fileFields: [
        "featuredImage",
        "gallery",
    ],

    translatableFields: [
        "title",
        "excerpt",
        "content",
        "seoTitle",
        "seoDescription",
    ],

    beforeUpdate: async ({ req, document }) => {
        if (
            req.body.isPublished === true &&
            !document.isPublished
        ) {
            req.body.publishedAt = new Date();
        }
    },
});


// Delete Blog
exports.deleteBlog = deleteOne(Blog, {
    modelName: "Blog",

    fileFields: [
        "featuredImage",
        "gallery",
    ],
});