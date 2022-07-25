import connection from "../dbStrategy/database.js";

export async function createRental(_, res) {
    const rent = res.locals.newRental
    try {
        await connection.query(`INSERT INTO rentals 
        (customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee) 
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,
            [rent.customerId, rent.gameId, rent.rentDate, rent.daysRented,
            rent.returnDate, rent.originalPrice, rent.delayFee])
        await connection.query('UPDATE games SET "stockTotal"=$1 WHERE id=$2',
        [(rent.gameStock-1),rent.gameId])
        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export function listRentals(_, res) {
try {
    const AllRentals = connection.query('SELECT * from rentals')
    res.send(AllRentals.rows)
} catch (error) {
    console.log(error)
    res.sendStatus(500);
}
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
        await connection.query('UPDATE games SET "stockTotal"=$1 WHERE id=$2',
        [(rental.gameStock+1),rental.gameId])
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function deleteRental(_, res) {
const id = res.locals.foundRental.id
try {
    await connection.query('DELETE * from rentals WHERE id=$1',[id])
    res.sendStatus(200)
} catch (error) {
    console.log(error)
    res.sendStatus(500)
}
}