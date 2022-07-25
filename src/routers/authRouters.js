import { Router } from "express";
import { createCustomer, listCustomers, getOneCustomer, modifyCustomer } from "../controllers/authControllers.js";
import { customerVerify, getByCPF } from "../middlewares/authMiddlewares.js";

const router = Router()

router.post('/customers',customerVerify,createCustomer)
router.get('/customers',getByCPF,listCustomers)
router.get('/customers/:id',getOneCustomer)
router.put('/customers/:id',customerVerify,modifyCustomer)

export default router;