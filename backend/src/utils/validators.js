import ApiError from "./ApiError.js"

export const validateRequiredFields = (fields) =>{
    for(const [fieldName,fieldVal] of Object.entries(fields)){
        if (fieldVal === undefined || fieldVal === null || fieldVal.trim() === "") {
            throw new ApiError(400,`${fieldName} is required`)
        }
    }
}

export const validateEmail = (email) => {
    const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        throw new ApiError(400,"Invalid email format")
    }
}

export const validatePw = (password) => {
    if (password.length < 6) {
        throw new ApiError(400,"Password must be atleast 6 characters long")
    }
}