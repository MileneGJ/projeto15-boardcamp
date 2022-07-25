import { Router } from "express";
import { createGame, listGames } from "../controllers/gameControllers.js"
import { gameVerify, getByName } from "../middlewares/gameMiddlewares.js"

const router = Router()

router.post('/games',gameVerify,createGame);
router.get('/games',getByName,listGames)

export default router