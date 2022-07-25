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
    } else if(foundGame.rows[0].stockTotal<1) {
        return res.send('Jogo sem estoque').status(400);
    }
     else {
        res.locals.newRental = {
            ...req.body,
            rentDate: new Date(),
            originalPrice: req.body.daysRented*foundGame.pricePerDay,
            returnDate: null,
            delayFee: null,
            gameStock:foundGame.rows[0].stockTotal
        }
        next()
    }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function checkConclusion (req,res,next) {
    const id = req.params.id
    try {
        const foundRental = connection.query(
            `SELECT rentals.*,
            games."pricePerDay" as "gamePrice",
            games."stockTotal" as "gameStock" 
            FROM rentals 
            JOIN games ON rentals."gameId"=games.id WHERE id=$1`,[id]);
        if(!foundRental.rows[0]){
            return res.sendStatus(404);
        } else if(foundRental.rows[0].returnDate){
            return res.sendStatus(400);
        } else {
            res.locals.foundRental = foundRental.rows[0]
            next()
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}