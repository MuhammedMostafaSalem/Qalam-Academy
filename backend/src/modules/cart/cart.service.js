const { StatusCodes } = require("http-status-codes");

const Cart = require("./cart.model");
const Course = require("../course/course.model");
const Product = require("../products/product.model");

const ApiError = require("../../utils/ApiError");
const {
    validateCoupon,
    calculateDiscount,
} = require("../coupon/coupon.service");

// Calculate Cart Totals
const calculateCartTotal = (cart) => {
    const total = cart.items.reduce((sum, item) => sum + item.price, 0);

    cart.totalCartPrice = Number(total.toFixed(2));

    if (cart.couponData) {
        cart.totalAfterDiscount = calculateDiscount(
            total,
            cart.couponData
        );
    } else {
        cart.totalAfterDiscount = null;
    }
}

// Add To Cart
exports.addToCart = async (userId, body) => {
    const { course, product } = body;

    if ((!course && !product) || (course && product)) {
        throw new ApiError("Please send either course or product", StatusCodes.BAD_REQUEST);
    }

    let item = {};

    // Course
    if (course) {
        const foundCourse = await Course.findById(course);

        if (!foundCourse) {
            throw new ApiError("Course not found", StatusCodes.NOT_FOUND);
        }

        item = {
            course: foundCourse._id,
            price:
                foundCourse.discountPrice > 0
                    ? foundCourse.discountPrice
                    : foundCourse.price,
        }
    }

    // Product
    if (product) {
        const foundProduct = await Product.findById(product);

        if (!foundProduct) {
            throw new ApiError("Product not found", StatusCodes.NOT_FOUND);
        }

        item = {
            product: foundProduct._id,
            price:
                foundProduct.discountPrice > 0
                    ? foundProduct.discountPrice
                    : foundProduct.price,
        }
    }

    let cart = await Cart.findOne({
        cartOwner: userId,
    });

    // Create Cart
    if (!cart) {
        cart = await Cart.create({
            cartOwner: userId,
            items: [item],
        });

        calculateCartTotal(cart);

        await cart.save();

        return cart;
    }

    // Prevent duplicate course
    if (
        course &&
        cart.items.some(
            (i) =>
                i.course &&
                i.course.toString() === course
        )
    ) {
        throw new ApiError("Course already exists in cart", StatusCodes.CONFLICT);
    }

    // Prevent duplicate product
    if (
        product &&
        cart.items.some(
            (i) =>
                i.product &&
                i.product.toString() === product
        )
    ) {
        throw new ApiError("Product already exists in cart", StatusCodes.CONFLICT);
    }

    cart.items.push(item);

    calculateCartTotal(cart);

    await cart.save();

    return cart;
}

// Get Logged User Cart
exports.getLoggedUserCart = async (userId) => {
    const cart = await Cart.findOne({
        cartOwner: userId,
    })
        .populate({
            path: "items.course",
            select: "title slug description thumbnail price discountPrice"
        })
        .populate({
            path: "items.product",
            select: "title slug description image price discountPrice"
        });

    if (!cart) {
        throw new ApiError("Cart not found", StatusCodes.NOT_FOUND);
    }

    cart.totalItems = cart.items.length;

    return cart;
}

// Remove Cart Item
exports.removeCartItem = async (userId, itemId) => {
    const cart = await Cart.findOne({
        cartOwner: userId,
    });

    if (!cart) {
        throw new ApiError("Cart not found", StatusCodes.NOT_FOUND);
    }

    const item = cart.items.id(itemId);

    if (!item) {
        throw new ApiError("Cart item not found", StatusCodes.NOT_FOUND);
    }

    item.deleteOne();

    calculateCartTotal(cart);

    if (cart.items.length === 0) {
        await cart.deleteOne();
        return null;
    }

    await cart.save();

    return cart;
}

// Clear Cart
exports.clearCart = async (userId) => {
    const cart = await Cart.findOne({
        cartOwner: userId,
    });

    if (!cart) {
        throw new ApiError("Cart not found", StatusCodes.NOT_FOUND);
    }

    cart.items = [];
    cart.totalCartPrice = 0;
    cart.totalAfterDiscount = null;
    cart.coupon = null;

    await cart.save();

    return cart;
}

// Apply Coupon
exports.applyCouponToCart = async (userId, couponName) => {
    const cart = await Cart.findOne({
        cartOwner: userId,
    })

    if (!cart) {
        throw new ApiError("Cart not found", StatusCodes.NOT_FOUND);
    }

    const coupon = await validateCoupon(couponName, userId);

    cart.coupon = coupon.name;

    cart.couponData = coupon;

    calculateCartTotal(cart);

    cart.couponData = undefined;

    await cart.save();

    return {
        _id: cart._id,
        totalCartPrice: cart.totalCartPrice,
        totalAfterDiscount: cart.totalAfterDiscount,
        coupon: cart.coupon,
    };
}

// Remove Coupon
exports.removeCouponFromCart = async (userId) => {
    const cart = await Cart.findOne({
        cartOwner: userId,
    });

    if (!cart) {
        throw new ApiError("Cart not found", StatusCodes.NOT_FOUND);
    }

    cart.coupon = null;
    cart.totalAfterDiscount = null;

    calculateCartTotal(cart);

    await cart.save();

    return cart;
}