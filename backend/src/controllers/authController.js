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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const isPwMatch = await bcrypt.compare(password, user.password)

        if (!isPwMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateAccessToken(user._id, user.email, user.role);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}  