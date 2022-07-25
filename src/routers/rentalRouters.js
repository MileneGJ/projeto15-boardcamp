import { Router } from "express";
import {listRentals, createRental, concludeRental, deleteRental} from '../controllers/rentalControllers.js';
import { rentalVerify, checkConclusion } from '../middlewares/rentalMiddlewares.js';

const router = Router()

router.get('/rentals',listRentals);
router.post('/rentals',rentalVerify,createRental);
router.post('/rentals/:id/return',checkConclusion,concludeRental);
router.delete('/rentals/:id',checkConclusion,deleteRental)

export default router