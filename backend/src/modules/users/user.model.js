const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const validator = require("validator");

// User Schema Definition
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [2, "Username must be at least 2 characters"],
        maxlength: [30, "Username must be at most 30 characters"],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email address",
        },
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true,
        validate: {
            validator: (value) => /^\+?[1-9]\d{9,14}$/.test(value),
            message: "Please enter a valid phone number in international format.",
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        maxlength: [20, "Password must be at most 20 characters"],
        select: false,  // Exclude password field by default when querying
        validate: {
            validator: function (value) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_-]{6,20}$/.test(value);
            },
            message: "Password must be 6-20 characters, contain at least one letter and one number, and may include symbols: _@$!%*#?&-"
        }
    },
    avatar: {
        type: String,
        default: null,
    },
    bio: {
        type: String,
        default: "",
        maxlength: 500
    },
    role: {
        type: String,
        enum: [
            "admin",
            "instructor",
            "student",
        ],
        default: "student",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: String,
    otpExpires: Date,
    otpResendTimeout: Date,
    otpPurpose: {
        type: String,
        enum: ["email_verification", "forgot_password"],
    },
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare given password with the database hash
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

// Method to generate and hash OTP
userSchema.methods.generateOtp = async function (purpose) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generate a 6-digit OTP

    const salt = await bcrypt.genSalt(10); // generate a salt
    this.otp = await bcrypt.hash(otp, salt); // hash the OTP

    this.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    this.otpResendTimeout = new Date(Date.now() + 60 * 1000); // Resend allowed after 1 minute
    this.otpPurpose = purpose;

    return otp;
}

// Method to generate JWT token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id },
        env.jwtAccessSecret,
        { expiresIn: env.jwtAccessExpiresIn }
    );
}

// method to generate Refresh JWT token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { id: this._id },
        env.jwtRefreshSecret,
        { expiresIn: env.jwtRefreshExpiresIn }
    )
}

const User = mongoose.model("User", userSchema);

module.exports = User;