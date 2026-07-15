import jwt from "jsonwebtoken"

export const generateAccessToken=(userId,email,role)=>{
    return jwt.sign(
        {
             id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
}

export const generateRefreshToken = ()=>{
    
}

export const verifyToken = (token)=>{
    return jwt.verify(token,process.env,JWT_SECRET)
}