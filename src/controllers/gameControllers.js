import connection from "../dbStrategy/database.js"

export async function createGame(_, res) {
    const game = res.locals.newGame
    try {
        await connection.query(`INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5)`,
        [game.name,game.image,game.stockTotal,game.categoryId,game.pricePerDay])
        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function listGames(_, res) {
    let AllGames
    try {
        if(res.locals.condition){
            AllGames = await connection.query('SELECT * FROM games WHERE name ILIKE $1',
            [`${res.locals.condition}%`])
        } else {
            AllGames = await connection.query('SELECT * FROM games')
        }
        res.send(AllGames.rows)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}