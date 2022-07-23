import connection from "../dbStrategy/database.js";

export function listCustomers () {
console.log("está caindo aqui")
const promise = connection.query('SELECT name FROM customers')
promise.then(result => console.log('ROLOU',result.rows))
promise.catch(error => console.log('NAO ROLOU',error.response))
}

export function getOneCustomer () {

}

export function createCustomer () {

}

export function modifyCustomer () {
    
}