import { Router } from "express";
import {listRentals, createRental, modifyRental, deleteRental} from '../controllers/rentalControllers.js';
import { rentalVerify } from '../middlewares/rentalMiddlewares.js';

const router = Router()

router.get('/rentals',listRentals);
router.post('/rentals',rentalVerify,createRental);
router.post('/rentals/:id/return',modifyRental);
router.delete('/rentals/:id',deleteRental)

export default router