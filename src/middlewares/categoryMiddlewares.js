import {categorySchema} from '../schemas/categorySchema.js';
import connection from '../dbStrategy/database.js';

export async function categoryVerify (req,res,next) {
    const validation = categorySchema.validate(req.body)
    if(validation.error){
        console.log(validation.error)
        return res.send(validation.error.details[0].message).status(400)
    }
    try {
        const foundCat = await connection.query('SELECT * from categories WHERE name=$1',[req.body.name])
        if(foundCat.rows[0]){
            res.locals.newCat = req.body
            next()
         } else {
        return res.sendStatus(409)
         }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}