import connection from "../dbStrategy/database.js"

export function createGame () {

}

export function listGames (_,res) {
    try {
        const AllGames = connection.query(`SELECT * FROM games ${res.locals.condition}`)
        res.send(AllGames.rows)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)        
    }    
}