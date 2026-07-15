import User from '../modals/User.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../services/tokenService.js';
import asyncHandler  from "../utils/asyncHandler.js";


export const register = asyncHandler(
    async (req, res) => {
        const { fullName, email, username, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPw = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashedPw })

        return res.status(200).json({
            success: true,
            message: 'User registered successfully'
        })

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