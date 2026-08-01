const express = require("express");
const {
    createHero,
    getHeroes,
    getHero,
    updateHero,
    deleteHero,
    getPublicHero,
} = require("./hero.controller");
const {
    createHeroSchema,
    updateHeroSchema,
} = require("./hero.schema");
const validate = require("../../middlewares/validate");
const uploadMultiple = require("../../middlewares/uploadMultiple");
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
router.get("/page/:page", getPublicHero);


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
router.use(
    isAuthenticatedUser,
    authorizeRoles("admin")
);

router
    .route("/")
    .get(getHeroes)
    .post(
        uploadMultiple({
            folder: "heroes",
            fileType: ["image", "video"],
            fields: [
                {
                    name: "image",
                    maxCount: 1,
                },
                {
                    name: "backgroundImage",
                    maxCount: 1,
                },
                {
                    name: "video",
                    maxCount: 1,
                },
            ],
        }),

        validate(createHeroSchema),

        createHero
    );

router
    .route("/:id")
    .get(getHero)

    .patch(
        uploadMultiple({
            folder: "heroes",
            fileType: ["image", "video"],
            fields: [
                {
                    name: "image",
                    maxCount: 1,
                },
                {
                    name: "backgroundImage",
                    maxCount: 1,
                },
                {
                    name: "video",
                    maxCount: 1,
                },
            ],
        }),

        validate(updateHeroSchema),

        updateHero
    )

    .delete(deleteHero);

module.exports = router;