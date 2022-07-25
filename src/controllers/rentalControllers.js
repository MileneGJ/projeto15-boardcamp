import connection from "../dbStrategy/database.js";

export async function createRental(_, res) {
    const rent = res.locals.newRental
    try {
        await connection.query(`INSERT INTO rentals 
        (customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee) 
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,
            [rent.customerId, rent.gameId, rent.rentDate, rent.daysRented,
            rent.returnDate, rent.originalPrice, rent.delayFee])
        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export function listRentals(req, res) {

}

export async function concludeRental(_, res) {
    const rental = res.locals.foundRental
    const returnDate = new Date()
    const delayFee = 0
    const actualDaysRented = returnDate.getDate() - rental.rentDate.getDate()
    if (actualDaysRented > rental.daysRented) {
        delayFee = (actualDaysRented - rental.daysRented) * rental.gamePrice
    }
    try {
        await connection.query('UPDATE customers SET "returnDate"=$1,"delayFee"=$2 WHERE id=$3',
            [returnDate, delayFee, rental.id])
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export function deleteRental(req, res) {

}