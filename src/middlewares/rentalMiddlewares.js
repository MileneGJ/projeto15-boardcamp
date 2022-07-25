import rentalSchema from '../schemas/rentalSchema.js'
import connection from '../dbStrategy/database.js';

export async function rentalVerify (req,res,next) {
    const validation = rentalSchema.validate(req.body)
    if(validation.error){
        console.log(validation.error)
        return res.send(validation.error.details[0].message).status(400);
    }
    try {
        const foundGame = await connection.query('SELECT * from games WHERE id=$1',
    [req.body.gameId])
    const foundUser = await connection.query('SELECT * from customers WHERE id=$1',
    [req.body.customerId])
    if(!foundGame.rows[0]||!foundUser.rows[0]){
        return res.send('Usuário ou jogo inexistente').status(400);
    } else if(foundGame.rows.stockTotal<1) {
        return res.send('Jogo sem estoque').status(400);
    }
     else {
        res.locals.newRental = {
            ...req.body,
            rentDate: new Date(),
            originalPrice: req.body.daysRented*foundGame.pricePerDay,
            returnDate: null,
            delayFee: null
        }
        next()
    }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
}