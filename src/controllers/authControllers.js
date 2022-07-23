import connection from "../dbStrategy/database.js";

export async function listCustomers() {
    try {
        const AllCustomers = await connection.query(`SELECT * FROM customers ${res.locals.condition}`)
        res.send(AllCustomers.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export function getOneCustomer() {

}

export function createCustomer() {

}

export function modifyCustomer() {

}