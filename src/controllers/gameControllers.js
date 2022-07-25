import connection from "../dbStrategy/database.js"

export async function createGame(_, res) {
    const game = res.locals.newGame
    try {
        await connection.query(`INSERT INTO games (name,image,stockTotal,pricePerDay) VALUES (${game.name},${game.image},${game.stockTotal},${game.pricePerDay})`)
        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function listGames(_, res) {
    try {
        const AllGames = await connection.query(`SELECT * FROM games ${res.locals.condition}`)
        res.send(AllGames.rows)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}