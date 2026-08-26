module.exports = {
    common: {
        success: "Success",
        failed: "Something went wrong",
        notFound: "Resource not found",
        duplicate: "The {{field}} '{{value}}' already exists",
    },

    course: {
        fetched: "Course fetched successfully",
        created: "Course created successfully",
        updated: "Course updated successfully",
        deleted: "Course deleted successfully",
        notFound: "Course not found",
    },
    
    courseDetails: {
        fetched: "Course details fetched successfully",
    },

    lesson: {
        fetched: "Lesson fetched successfully",
        created: "Lesson created successfully",
        updated: "Lesson updated successfully",
        deleted: "Lesson deleted successfully",
        notFound: "Lesson not found",
    },

    category: {
        fetched: "Category fetched successfully",
        created: "Category created successfully",
        updated: "Category updated successfully",
        deleted: "Category deleted successfully",
        notFound: "Category not found",
    },
    
    blog: {
        fetched: "Blog fetched successfully",
        created: "Blog created successfully",
        updated: "Blog updated successfully",
        deleted: "Blog deleted successfully",
        notFound: "Blog not found",
    },

    cart: {
        validateitmeType: "Invalid item type. Must be Product or Course",
        notDbItem: "No ({{type}}) found with this ID",
        created: "Added successfully to your cart",
        exist: "No cart exist for this user: ({{user}})",
        deleted: "Item removed from cart successfully",
        cleared: "Cart cleared successfully",
        notFound: 'Cart not found',
        itemFound: `No Product Cart item found for this id: ({{id}})`,
        invalidCoupon: 'Coupon is invalid or has expired',
        removeCoupon: "Coupon removed successfully",
    },

    choose: {
        fetched: "Choose fetched successfully",
        updated: "Choose updated successfully",
    },

    contact: {
        fetched: "Contact fetched successfully",
        created: "Contact created successfully",
        updated: "Contact updated successfully",
        deleted: "Contact deleted successfully",
        notFound: "Contact not found",
    },

    coupon: {
        fetched: "Coupon fetched successfully",
        created: "Coupon created successfully",
        updated: "Coupon updated successfully",
        deleted: "Coupon deleted successfully",
        notFound: "Coupon not found",
    },

    dashboard: {
        fetched: "Dashboard fetched successfully",
    },

    hero: {
        created: "Hero created successfully",
        updated: "Hero updated successfully",
        deleted: "Hero deleted successfully",
    },

    journey: {
        fetched: "Journey fetched successfully",
        updated: "Journey updated successfully",
    },

    fields: {
        email: "Email",
        title: "Title",
        slug: "Slug",
    },

    auth: {
        sentOtp: "otp sent to your email for verification",
        verifiedEmail: "User successfully verified",
        verifiedPassword: "OTP verified, you can reset your password now",
        resendEmail: "Verification OTP resent successfully",
        resendPassword: "Password reset OTP resent successfully",
        notmatchPassword: "Passwords do not match",
        notFound: "User not found",
        successMessage: "Reset password successfully",
        invalidResetToken: "Invalid or expired reset token please send your email again",
        verifyFisrt: "Please verify your account first",
        incorrectPass: "Password is incorrect",
        successLogin: "Logged in successfully",
        PleaseLoginToAccess: "Unauthorized. Please login to access this resource",
        sessionExpired: "Session expired, please login again",
        invalidToken: "Invalid token. Please login again",
        roleNotAllowed: "Role ({{role}}) is not allowed to access this resource",
        logout: "Logged out successfully",
    },

    user: {
        fetched: "User fetched successfully",
        updated: "User updated successfully",
        deleted: "User deleted successfully",
        notFound: "User not found",
        notAllowed: "You are not allowed to change another user's password",
        incorrectCurrentPassword: "Current password is incorrect",
        notMatchComfirmPassword: "Password confirmation does not match",
        newPasswordDifferent: "New password must be different from current password",
        successMessagePassword: "Password changed successfully",
        fetchedThemeMode: "Theme mode fetched successfully",
        updatedThemeMode: "Theme mode updated successfully",
        cannotDeactivate: "You cannot deactivate your own account",
        cannotChangeOwnRole: "You cannot change your own admin role",
        administratorDeactivatedAccount: "Your account has been deactivated by the administrator",
    },

    order: {
        fetched: "Order fetched successfully",
        createdCash: "Order created cash successfully",
        createdPaymob: "Paymob intention created successfully",
        updated: "Order updated successfully",
        deleted: "Order deleted successfully",
        notFound: "Order not found",
        payPalIdNotFound: "PayPal Payment Intent ID not found for this order",
        paypalCompleted: "Payment completed successfully via PayPal",
        paypalNotCompleted: "Payment was not completed by PayPal",
        noCart: "There is no cart for this user: ({{user}})",
        InvalidPayment: "Invalid payment type selected",
        alreadyPaid: "Order is already paid",
        alreadyCancelled: "Order already cancelled",
        notCancelled: "Paid orders can't be cancelled. Refund is required",
        cancelled: "Order cancelled successfully",
    },

    enrollment: {
        fetched: "Enrollment fetched successfully",
        updated: "Enrollment updated successfully",
        deleted: "Enrollment deleted successfully",
        notFound: "Enrollment not found",
    },

    partner: {
        fetched: "Partner fetched successfully",
        created: "Partner created successfully",
        updated: "Partner updated successfully",
        deleted: "Partner deleted successfully",
        notFound: "Partner not found",
    },
    
    portfolio: {
        fetched: "Portfolio fetched successfully",
        created: "Portfolio created successfully",
        updated: "Portfolio updated successfully",
        deleted: "Portfolio deleted successfully",
        notFound: "Portfolio not found",
    },
    
    product: {
        fetched: "Product fetched successfully",
        created: "Product created successfully",
        updated: "Product updated successfully",
        deleted: "Product deleted successfully",
        notFound: "Product not found",
    },
    
    progress: {
        fetched: "Course progress fetched successfully",
        continueWatchingFetched: "Continue watching fetched successfully",
        updated: "Progress updated successfully",
        notEnrolledCourse: "You are not enrolled in this course",
    },

    review: {
        fetched: "Review fetched successfully",
        created: "Review created successfully",
        updated: "Review updated successfully",
        deleted: "Review deleted successfully",
        notFound: "Review not found",
        mustEnroll: "You must enroll in this course before leaving a review",
        alreadyReviewed: "You have already reviewed this course",
    },

    service: {
        fetched: "Service fetched successfully",
        created: "Service created successfully",
        updated: "Service updated successfully",
        deleted: "Service deleted successfully",
        notFound: "Service not found",
    },
    
    settings: {
        fetched: "Settings fetched successfully",
        themeFetched: "Theme fetched successfully",
        created: "Settings created successfully",
        updated: "Settings updated successfully",
        themeUpdated: "Theme updated successfully",
        deleted: "Settings deleted successfully",
        notFound: "Settings not found",
    },

    team: {
        fetched: "Team fetched successfully",
        created: "Team member created successfully",
        updated: "Team member updated successfully",
        deleted: "Team member deleted successfully",
        notFound: "Team member not found",
    },
    
    timeline: {
        fetched: "Timeline fetched successfully",
        created: "Timeline created successfully",
        updated: "Timeline updated successfully",
        deleted: "Timeline deleted successfully",
        notFound: "Timeline not found",
    },
    
    wishlist: {
        fetched: "Wishlist fetched successfully",
        added: "Course added successfully to your wishlist",
        removed: "Course removed successfully from your wishlist",
    },
};