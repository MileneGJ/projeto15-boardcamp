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

export function getOneCustomer(req,res) {
    const id = req.params.id
    try {
        const FoundCustomer = await connection.query(`SELECT * FROM customers WHERE id=${id}`)
        if(FoundCustomer.rows[0]){
            return res.send(FoundCustomer.rows[0])
        } else {
            return res.sendStatus(404)
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
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

export async function modifyCustomer(req,res) {
    const id = req.params.id
    try {
        await connection.query(`UPDATE customers SET name=${res.locals.newUser.name},phone=${res.locals.newUser.phone},cpf=${res.locals.newUser.cpf},birthday=${res.locals.newUser.birthday} WHERE id=${id}`)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}