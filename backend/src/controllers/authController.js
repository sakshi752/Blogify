import User from '../modals/User.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../services/tokenService.js';
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadOnCloudinary, deleteOnCloudinary } from '../utils/cloudinary.js';
import {
    validateEmail,
    validatePw,
    validateRequiredFields
} from "../utils/validators.js";
import { optionsObject } from '../utils/global.js';

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        // get user by Id
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({
            validateBeforeSave: false
        });

        return {
            accessToken,
            refreshToken
        };

    } catch (error) {
        throw new ApiError(
            500,
            error.message ||
            "Something went wrong while generating refresh and access token"
        );
    }
};

export const register = asyncHandler(async (req, res) => {
    // get the user's details from frontend
    const { username, email, fullname, password } = req.body;

    // add a validation if any of the field is empty or not
    validateRequiredFields({
        username,
        email,
        fullname,
        password
    })

    // Validate email and password
    validateEmail(email)
    validatePw(password)

    // check if user already exists: username, email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(400, "User with given email or username already exists")
    }

    // check for avatarLocalPath image
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatarLocalPath file is required")
    }

    // upload it to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Error while uploading avatar file on cloudinary")
    }

    // Create user
    const user = await User.create({
        fullname,
        email: email.toLowerCase(),
        avatar: {
            url: avatar.url,
            publicId: avatar.public_id
        },
        password,
        username: username.toLowerCase()
    })

    return res.status(200).json(
        new ApiResponse(200, "User registered Successfully")
    )
}
)

export const loginUser = asyncHandler(async (req, res) => {
    // get user's username or email(identifier) and password
    const { identifier, password } = req.body;

    // validate required fields
    validateRequiredFields({ identifier, password })

    // check if user exists or not
    const user = await User.findOne({
        $or: [
            { username: identifier },
            { email: identifier }
        ]
    })

    if (!user) throw new ApiError(400, "User doesnot exists")

    // verify password
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) throw new ApiError(401, "Invalid Password")

    // generate both access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    //note:- we can calling this new user bcoz user didnot had refresh token and now current loggedInUser donot have password and refresh token field
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    //note:- httpOnly: true means the cookie cannot be accessed by frontend JS so browser JS cannot read refresh token the http reqs (browse can automatically send refreshToken)
    // secure: true means send this cookie only over and HTTPS connection to make it come in HTTP make it false
    const options = optionsObject

    // attach tokens with cookies and return data
    return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                "User logged In SeccessFully",
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                }
            )
        )
})

export const logoutUser = asyncHandler(async (req, res) => {

    // find user by ID and update the refreshToken: undefined 
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    // clear cookie
    const options = optionsObject

    return res.status(200).clearCookie("refreshToken", options).json(
        new ApiResponse(200, "User is logged out successfully")
    )
})

export const refreshAccessToken = asyncHandler(async (req, res) => {
    // take the refresh token
    // check and throw error if refresh token is not present
    // verify the incoming refresh token and the one in env vars using jwt.verify
    // then access the user through it
    // if user not present the the token is invalid
    // check if user's refresh token and incoming refresh tokens are same or not if not throw error as the refresh token is expired or used
    // if not generate both access token and refresh token again
    // rend the cookie and other response
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request")

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.refreshAccessToken);

        const user = await User.findById(decodedToken?._id)

        if (incomingRefreshToken !== user.refreshToken) throw new ApiError(401, "Refresh token is expired or used")

        const options = optionsObject

        const { accessToken, newRefreshToken } = generateAccessAndRefreshTokens(user._id);

        return res.status(200).cookie("refreshToken", newRefreshToken, options).json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken: newRefreshToken
                },
                "Access token refreshed"
            )
        )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

export const forgetPassword = asyncHandler(async (req, res) => {
    //     email
    //     ↓
    // OTP / reset token
    //     ↓
    // Redis or database
})

export const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    validateRequiredFields({ oldPassword, newPassword })

    const user = User.findById(req.user?.id);

    const isPwCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPwCorrect) {
        throw new ApiError(401, "Invalid Old Password")
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false })

    return res.status(200).json(
        new ApiResponse(200, "Password changed successfully")
    )
})

export const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "Current user fetched successfully"
            )
        );
});

export const updateUserProfile = asyncHandler(async (req, res) => {
    //  Get data from req.body
    const { fullname, bio, username, email } = req.body;

    //  Get current logged-in user
    const user = req.user

    if (bio || fullname) {
        user.bio = bio
        user.fullname = fullname
    }

    // check if username is give and it is not equal to the username of logged in user
    if (username != undefined && username !== user.username) {
        // check if given username is already present or not
        const existingUser = await User.findOne({
            username: username.toLowerCase()
        })

        if (existingUser) throw new ApiError(409, `User with ${username} already exists`)

        // check that if 7 days have passed or not
        if (user.usernameChangeWeekStart) {
            const now = new Date();
            const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
            const timePassed = now.getTime() - user.usernameChangeWeekStart.getTime();

            if (timePassed >= sevenDaysInMilliseconds) {
                user.usernameChangeCount = 0;
                user.usernameChangeWeekStart = now;
            }
        }

        if (user.usernameChangeCount >= 2) {
            throw new ApiError(400, "You can change username only twice within 7 days")
        }

        user.username = username.toLowerCase();

        if (user.usernameChangeCount === 0) user.usernameChangeWeekStart = new Date()

        user.usernameChangeCount += 1
    }

    // check if email is given and it is not equal to the email of logged in user
    if (email != undefined && email !== user.email) {
        // check if given email is already present or not
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        })

        if (existingUser) throw new ApiError(409, "User already exists with give email")

        user.email = email.toLowerCase();
    }

    await user.save({
        validateBeforeSave: false
    });


    const updateUser = User.findById(user._id).select("-password -refreshToken");

    // Return updated user
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "User Updated SeccessFully",
                {
                    user: updateUser,
                }
            )
        )
})

export const updateAvatar = asyncHandler(async (req, res) => {
    // get new avatar local path
    const avatarLocalPath = req.file?.path;

    // check if it exists or not
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatarLocalPath file is required")
    }

    // Get current user first
    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Save old avatar publicId
    const oldAvatarPublicId = user.avatar?.publicId;

    // Delete old avatar from cloudinary
    if (oldAvatarPublicId) {
        const deleteData = await deleteOnCloudinary(oldAvatarPublicId)

        if (!deleteData) {
            throw new ApiError(400, "Error in deleting old avatar from cloudinary")
        }
    }

    // upload new avatar to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Error while uploading avatar file on cloudinary")
    }

    // Update user with new avatar
    user.avatar = {
        url: avatar.url,
        publicId: avatar.public_id
    };

    await user.save();

    // Remove sensitive fields
    const updatedUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(200, "Avatar updated successfully", updatedUser)
    )
})

export const DeactivateProfile = asyncHandler(async (req, res) => {
    const { password } = req.body;

    // verify password
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) throw new ApiError(401, "Invalid Password")

    // find user by ID and update the refreshToken: undefined 
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                isDeactivate: true
            }
        },
        {
            new: true
        }
    )

    const options = optionsObject

    return res.status(200).clearCookie("refreshToken", options).json(
        new ApiResponse(200, "Your Account is deactivated successfully")
    )


})

