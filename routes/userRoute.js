import express from 'express'
import verifyToken from '../middleware/verifyToken.js'
const router = express.Router()

import { getAll, getById, store, update, remove } from '../controllers/userController.js'

router.get('/', verifyToken, getAll)

router.get('/:id', verifyToken, getById)

router.post('/', verifyToken, store)

router.put('/:id', verifyToken, update)

router.delete('/:id', verifyToken, remove)

export default router