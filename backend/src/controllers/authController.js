import User from '../modals/User.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../services/tokenService.js';
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import {
    validateEmail,
    validatePw,
    validateRequiredFields
} from "../utils/validators.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
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
    // add a validation if any of the field is empty or not
    // check if user already exists: username, email
    // check for avatarLocalPath image
    // upload it to cloudinary
    // create user object - create entry in db


    const { username, email, fullname, password } = req.body;

    validateRequiredFields({
        username,
        email,
        fullname,
        password
    })

    validateEmail(email)
    validatePw(password)

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(400, "User with given email or username already exists")
    }

    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatarLocalPath file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }


    const user = await User.create({
        fullname,
        email: email.toLowerCase(),
        avatar: avatar.url,
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
    // see if user donot exist return error
    // check password
    // generate token
    // attach tokens with cookies
    // return data
    const { identifier, password } = req.body;

    validateRequiredFields({ identifier, password })

    const user = await User.findOne({
        $or: [
            { username: identifier },
            { email: identifier }
        ]
    })

    if (!user) throw new ApiError(400, "User doesnot exists")

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) throw new ApiError(401, "Invalid Password")

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // we can calling this new user bcoz user didnot had refresh token and now current loggedInUser donot have password and refresh token field
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // httpOnly: true means the cookie cannot be accessed by frontend JS so browser JS cannot read refresh token the http reqs (browse can automatically send refreshToken)
    // secure: true means send this cookie only over and HTTPS connection to make it come in HTTP make it false
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }

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
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }

    return res.status(200).clearCookie("refreshToken", options).json(
        new ApiResponse(200, "User is logged out successfully")
    )
})

export const refreshAccessToken = asyncHandler(async (req,res)=>{
    // take the refresh token
    // check and throw error if refresh token is not present
    // verify the incoming refresh token and the one in env vars using jwt.verify
    // then access the user through it
    // if user not present the the token is invalid
    // check if user's refresh token and incoming refresh tokens are same or not if not throw error as the refresh token is expired or used
    // if not generate both access token and refresh token again
    // rend the cookie and other response
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken) throw new ApiError(401,"Unauthorized request")

    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.refreshAccessToken);

        const user = await User.findById(decodedToken?._id)

        if(incomingRefreshToken !== user.refreshToken)throw new ApiError(401,"Refresh token is expired or used")

        const options = {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production"
        }

        const {accessToken,newRefreshToken} = generateAccessAndRefreshTokens(user._id);

        return res.status(200).cookie("refreshToken",newRefreshToken,options).json(
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