import { Router } from "express";
import {listRentals, createRental, concludeRental, deleteRental} from '../controllers/rentalControllers.js';
import { rentalVerify, checkConclusion, checkForDelete, addCustomerAndGame, getByIDs } from '../middlewares/rentalMiddlewares.js';

const router = Router()

router.get('/rentals',getByIDs,addCustomerAndGame,listRentals);
router.post('/rentals',rentalVerify,createRental);
router.post('/rentals/:id/return',checkConclusion,concludeRental);
router.delete('/rentals/:id',checkForDelete,deleteRental)

export default router