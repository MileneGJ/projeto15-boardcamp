import connection from "../dbStrategy/database.js";

export async function createRental (req,res) {
    const rent = res.locals.newRental
    try {
        await connection.query(`INSERT INTO rentals 
        (customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee) 
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [rent.customerId,rent.gameId,rent.rentDate,rent.daysRented,
        rent.returnDate,rent.originalPrice,rent.delayFee])
        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export function listRentals () {

}

export function modifyRental () {

}

export function deleteRental () {
    
}