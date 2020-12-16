import {getAll} from '../controllers/postController.js'
import express from 'express'
const router = express.Router()

router.get('/', getAll)

export default router
