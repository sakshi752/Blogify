import express from "express"
import { loginUser, logoutUser, refreshAccessToken, register } from "../controllers/authController.js"
import upload from "../middleware/multer.js"
import { authenticationMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/register', upload.single('avatar'), register)
router.post('/login', loginUser)

// secured user routes
router.post("/logout",authenticationMiddleware,logoutUser)
router.post("/refresh-token",refreshAccessToken)

export default router