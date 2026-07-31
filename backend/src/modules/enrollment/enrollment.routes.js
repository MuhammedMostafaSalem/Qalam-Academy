const express = require('express');
const {
    getMyEnrollments,
    getMyPurchasedProducts,
} = require('./enrollment.controller');
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const router = express.Router();

router.use(isAuthenticatedUser, authorizeRoles('student'));

router.get('/my-courses', getMyEnrollments);
router.get('/my-products', getMyPurchasedProducts);

module.exports = router;