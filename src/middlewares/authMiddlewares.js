import {userSchema} from '../schemas/userSchema.js'
import connection from '../dbStrategy/database.js';

export async function customerVerify(req, res, next) {
    const validation = userSchema.validate(req.body);
    if (validation.error) {
        console.log(validation.error)
        return res.status(400).send(validation.error.details[0].message)
    }
    try {
        let foundUserID = await connection.query('SELECT id from customers WHERE cpf=$1',[req.body.cpf])
        
        if (req.params.id) {
            foundUserID = foundUserID.rows.map(u=>u.id)
            if (foundUserID.length>1||!foundUserID.includes(parseInt(req.params.id))) {
                return res.sendStatus(409);
            } else {
                res.locals.newUser = req.body;
                next()
            }
        } else {
            if (foundUserID.rows[0]) {
                return res.sendStatus(409)
            } else {
                res.locals.newUser = req.body;
                next()
            }
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export function getByCPF(req, res, next) {
    const {cpf} = req.query
    if (cpf?.length > 0) {
        res.locals.condition = cpf
    }
    next()
}