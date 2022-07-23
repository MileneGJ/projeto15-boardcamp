import userSchema from '../schemas/userSchema.js'
import connection from '../dbStrategy/database.js';

export async function customerVerify(req, res, next) {
    const validation = userSchema.validate(req.body);
    if (validation.error) {
        console.log(validation.error)
        return res.send(validation.error.details[0].message).status(400)
    }
    try {
        const foundUser = await connection.query(`SELECT * from customers WHERE cpf=${req.body.cpf}`)
        if (req.params.id) {
            const IDarrays = foundUser.rows.map(u=>u.id)
            if (foundUser.rows.length>1||!IDarrays.includes(req.params.id)) {
                return res.sendStatus(409);
            } else {
                res.locals.newUser = req.body;
                next()
            }
        } else {
            if (foundUser.rows[0]) {
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

export async function getByCPF(req, res, next) {
    const cpf = req.query.cpf
    if (cpf.length > 0) {
        res.locals.condition = `WHERE cpf LIKE ${req.query.cpf}%`
    } else {
        res.locals.condition = ""
    }
    next()
}