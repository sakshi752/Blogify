import express from "express"
import { changeCurrentPassword, DeactivateProfile, forgetPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, register, updateAvatar, updateUserProfile } from "../controllers/authController.js"
import upload from "../middleware/multer.js"
import { authenticationMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/register', upload.single('avatar'), register)
router.post('/login', loginUser)
router.post("/forget-password",forgetPassword)
router.post("/refresh-token",refreshAccessToken)

// secured user routes
router.post("/logout",authenticationMiddleware,logoutUser)
router.patch("/change-password",authenticationMiddleware,changeCurrentPassword)
router.get("/get-user",authenticationMiddleware,getCurrentUser)
router.patch("/update-user",authenticationMiddleware,updateUserProfile)
router.patch("/update-avatar",authenticationMiddleware,upload.single('avatar'),updateAvatar)
router.patch("/deactivate",authenticationMiddleware,DeactivateProfile)

export default router