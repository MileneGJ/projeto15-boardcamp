import {gameSchema} from '../schemas/gameSchema.js'
import connection from '../dbStrategy/database.js'

export async function gameVerify (req,res,next) {
    const validation = gameSchema.validate(req.body)
    if (validation.error) {
        console.log(validation.error)
        return res.status(400).send(validation.error.details[0].message)
    }
    try {
        const foundGame = await connection.query('SELECT * from games WHERE name=$1',
        [req.body.name])
        const foundCategory = await connection.query('SELECT * from categories WHERE id=$1',
        [req.body.categoryId])
        if(!foundCategory.rows[0]){
            return res.status(400).send('Não existe o ID da categoria informado')
        } else if(foundGame.rows[0]) {
            return res.sendStatus(409)
        } else {
            res.locals.newGame = req.body;
            next()
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export function getByName (req,res,next) {
    const {name} = req.query
    if (name?.length > 0) {
        res.locals.condition = name
    }
    next()
}