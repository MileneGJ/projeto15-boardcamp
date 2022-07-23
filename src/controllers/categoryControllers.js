import connection from "../dbStrategy/database.js";

export async function createCategory(_, res) {
    try {
        await connection.query(`INSERT INTO categories (name) VALUES (${res.locals.newCat.name})`)
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function listCategories(_, res) {
    try {
        const AllCategories = await connection.query('SELECT * FROM categories')
        res.send(AllCategories.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

}