const express = require('express');
const {
    addCourseToWishlist,
    removeCourseFromWishlist,
    myWishlist,
} = require('./wishlist.controller');

const { isAuthenticatedUser } = require('../../middlewares/auth');

const router = express.Router();

router
    .route('/course')
    .post(isAuthenticatedUser, addCourseToWishlist)
    .get(isAuthenticatedUser, myWishlist);

router.delete('/course/:courseId', isAuthenticatedUser, removeCourseFromWishlist);

module.exports = router;
