import { categorySchema } from '../schemas/categorySchema.js';
import connection from '../dbStrategy/database.js';

export async function categoryVerify(req, res, next) {
    const validation = categorySchema.validate(req.body)
    if (validation.error) {
        console.log(validation.error)
        return res.status(400).send(validation.error.details[0].message)
    }
    try {
        const foundCat = await connection.query('SELECT * from categories WHERE name=$1', [req.body.name])
        if (foundCat.rows[0]) {
            return res.sendStatus(409)
        } else {
            res.locals.newCat = req.body
            next()
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}