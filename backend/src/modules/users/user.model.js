const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const generateSlug = require("../../utils/generateSlug");

// User Schema Definition
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,  // Exclude password field by default when querying
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
    otp: {
        type: String,
        select: false,
    },
    otpExpires: {
        type: Date,
        select: false,
    },
    otpResendTimeout: {
        type: Date,
        select: false,
    },
    otpPurpose: {
        type: String,
        enum: ["email_verification", "forgot_password"],
        select: false,
    },
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

userSchema.pre("validate", function () {
    if (this.isModified("username")) {
        this.slug = generateSlug(this.username);
    }
});

// Hash password before saving the user
userSchema.pre("save", async function () {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return;

    // generate a salt
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        console.log(err)
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