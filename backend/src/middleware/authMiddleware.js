import jwt from "jsonwebtoken"
import { verifyToken } from "../services/tokenService";

export const authenticationMiddleware = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({
            success:false,
            message:"No token provided"
        })
    }

    try {

        const decodedUser = verifyToken(token)

        req.user = decodedUser;
        next();
        
    } catch (error) {
        return res.status(400).json({
            success:false,
             message: error.message
        })
    }
}