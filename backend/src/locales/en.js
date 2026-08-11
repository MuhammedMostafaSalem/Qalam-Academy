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

    category: {
        fetched: "category fetched successfully",
        created: "category created successfully",
        updated: "category updated successfully",
        deleted: "category deleted successfully",
        notFound: "category not found",
    },

    hero: {
        created: "Hero created successfully",
        updated: "Hero updated successfully",
        deleted: "Hero deleted successfully",
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
        roleNotAllowed: "Role ({{role}}) is not allowed to access this resource"
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

    enrollment: {
        fetched: "enrollment fetched successfully",
        updated: "enrollment updated successfully",
        deleted: "enrollment deleted successfully",
        notFound: "enrollment not found",
    }
};