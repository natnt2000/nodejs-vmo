import { login, refreshToken } from '../controllers/authController.js'
import verifyRefreshToken from '../middleware/verifyRefreshToken.js'
import express from 'express'
const router = express.Router()

router.post('/login', login)

router.post('/refresh-token', verifyRefreshToken, refreshToken)

export default router