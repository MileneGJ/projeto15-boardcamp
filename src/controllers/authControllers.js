import connection from "../dbStrategy/database.js";

export async function listCustomers(_,res) {
    let AllCustomers
    try {
        if(res.locals.condition){
            AllCustomers = await connection.query('SELECT * FROM customers WHERE cpf LIKE $1',[`${res.locals.condition}%`])
        } else {
            AllCustomers = await connection.query('SELECT * FROM customers')
        }
        return res.send(AllCustomers.rows)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function getOneCustomer(req,res) {
    const id = req.params.id
    try {
        const FoundCustomer = await connection.query('SELECT * FROM customers WHERE id=$1',[id])
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

export async function createCustomer(_,res) {
    const customer = res.locals.newUser
    try {
        await connection.query('INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)',
        [customer.name,customer.phone,customer.cpf,customer.birthday])
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function modifyCustomer(req,res) {
    const id = req.params.id
    const customer = res.locals.newUser
    try {
        await connection.query('UPDATE customers SET name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5',
        [customer.name,customer.phone,customer.cpf,customer.birthday,id])
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}