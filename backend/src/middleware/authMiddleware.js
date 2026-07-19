import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../modals/User.js";

export const authenticationMiddleware = asyncHandler(
    async (req, res, next) => {

        const token =
            req.cookies?.accessToken ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            throw new ApiError(
                401,
                "Unauthorized request"
            );
        }

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const decodedUser = await User
            .findById(decodedToken._id)
            .select("-password -refreshToken");

        if (!decodedUser) {
            throw new ApiError(
                401,
                "Invalid Access Token"
            );
        }

        req.user = decodedUser;

        next();
    }
);