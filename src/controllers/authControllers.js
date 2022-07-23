import connection from "../dbStrategy/database.js";

export async function listCustomers(_,res) {
    try {
        const AllCustomers = await connection.query(`SELECT * FROM customers ${res.locals.condition}`)
        return res.send(AllCustomers.rows)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export function getOneCustomer() {

}

export async function createCustomer(req,res) {
    try {
        await connection.query(`INSERT INTO customers (name,phone,cpf,birthday) VALUES (${req.body.name},${req.body.phone},${req.body.cpf},${req.body.birthday})`)
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export function modifyCustomer() {

}