import userSchema from '../schemas/userSchema.js'
import connection from '../dbStrategy/database.js';

export async function customerVerify (req,res,next) {
    const validation = userSchema.validate(req.body);
    if(validation.error){
        console.log(validation.error)
        return res.send(validation.error.details[0].message).status(400)
    }
    try {
        const foundUser = await connection.query(`SELECT * from customers WHERE cpf=${req.body.cpf}`)
        if(foundUser.rows[0]){
            res.locals.newUser = req.body
            next()
        } else {
            return res.sendStatus(409)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}