import { Router } from "express";
import { createCategory, listCategories } from '../controllers/categoryControllers.js'
import { categoryVerify } from '../middlewares/categoryMiddlewares.js'

const router = Router()

router.post('/categories',categoryVerify,createCategory)
router.get('/categories',listCategories)

export default router