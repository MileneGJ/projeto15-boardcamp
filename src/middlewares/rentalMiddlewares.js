import { rentalSchema } from '../schemas/rentalSchema.js'
import connection from '../dbStrategy/database.js';

export async function rentalVerify(req, res, next) {
    const validation = rentalSchema.validate(req.body)
    if (validation.error) {
        console.log(validation.error)
        return res.status(400).send(validation.error.details[0].message);
    }
    try {
        const foundGame = await connection.query('SELECT * from games WHERE id=$1',
            [req.body.gameId])
        const foundUser = await connection.query('SELECT * from customers WHERE id=$1',
            [req.body.customerId])
        if (!foundGame.rows[0] || !foundUser.rows[0]) {
            return res.status(400).send('Usuário ou jogo inexistente');
        } else if (foundGame.rows[0].stockTotal < 1) {
            return res.status(400).send('Jogo sem estoque');
        }
        else {
            res.locals.newRental = {
                ...req.body,
                rentDate: new Date(),
                originalPrice: req.body.daysRented * foundGame.rows[0].pricePerDay,
                returnDate: null,
                delayFee: null,
                gameStock: foundGame.rows[0].stockTotal
            }
            next()
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function checkConclusion(req, res, next) {
    const id = req.params.id
    try {
        const foundRental = await connection.query(
            `SELECT rentals.*,
            games."pricePerDay" as "gamePrice",
            games."stockTotal" as "gameStock" 
            FROM rentals 
            JOIN games ON rentals."gameId"=games.id WHERE rentals.id=$1`, [id]);

        if (!foundRental?.rows[0]) {
            return res.sendStatus(404);
        } else if (foundRental.rows[0].returnDate) {
            return res.sendStatus(400);
        } else {
            res.locals.foundRental = foundRental.rows[0]
            next()
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function checkForDelete(req, res, next) {
    const id = req.params.id
    try {
        const foundRental = await connection.query(
            `SELECT * FROM rentals WHERE id=$1`, [id]);
        if (!foundRental?.rows[0]) {
            return res.sendStatus(404);
        } else if (!foundRental.rows[0].returnDate) {
            return res.sendStatus(400);
        } else {
            res.locals.rentalID = id
            next()
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function addCustomerAndGame(_, res, next) {
    let entireRentalInfo
    try {

        if (res.locals.filterUser && !res.locals.filterGame) {
            entireRentalInfo = await connection.query(
                `SELECT rentals.*,
                customers.name as "customerName",
                games.name as "gameName", games."categoryId", 
                categories.name as "categoryName"
                FROM rentals 
                JOIN customers 
                ON rentals."customerId" = customers.id
                JOIN games
                ON rentals."gameId" = games.id
                JOIN categories
                ON games."categoryId" = categories.id
                WHERE customers.id=$1`, [res.locals.filterUser])
        }

        else if (res.locals.filterGame && !res.locals.filterUser) {
            entireRentalInfo = await connection.query(
                `SELECT rentals.*,
                customers.name as "customerName",
                games.name as "gameName", games."categoryId", 
                categories.name as "categoryName"
                FROM rentals 
                JOIN customers 
                ON rentals."customerId" = customers.id
                JOIN games
                ON rentals."gameId" = games.id
                JOIN categories
                ON games."categoryId" = categories.id
                WHERE games.id=$1`, [res.locals.filterGame])
        }

        else if (res.locals.filterGame && res.locals.filterUser) {
            entireRentalInfo = await connection.query(
                `SELECT rentals.*,
                customers.name as "customerName",
                games.name as "gameName", games."categoryId", 
                categories.name as "categoryName"
                FROM rentals 
                JOIN customers 
                ON rentals."customerId" = customers.id
                JOIN games
                ON rentals."gameId" = games.id
                JOIN categories
                ON games."categoryId" = categories.id
                WHERE games.id=$1 AND customers.id=$2`,
                [res.locals.filterGame, res.locals.filterUser])
        } else {
            entireRentalInfo = await connection.query(
                `SELECT rentals.*,
            customers.name as "customerName",
            games.name as "gameName", games."categoryId", 
            categories.name as "categoryName"
            FROM rentals 
            JOIN customers 
            ON rentals."customerId" = customers.id
            JOIN games
            ON rentals."gameId" = games.id
            JOIN categories
            ON games."categoryId" = categories.id`)
        }


        const formattedRentals = entireRentalInfo.rows.map(r => ({
            id: r.id,
            customerId: r.customerId,
            gameId: r.gameId,
            rentDate: r.rentDate,
            daysRented: r.daysRented,
            returnDate: r.returnDate,
            originalPrice: r.originalPrice,
            delayFee: r.delayFee,
            customer: {
                id: r.customerId,
                name: r.customerName
            },
            game: {
                id: r.gameId,
                name: r.gameName,
                categoryId: r.categoryId,
                categoryName: r.categoryName
            }
        }))

        res.locals.rentalList = formattedRentals;
        next()

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export function getByIDs(req, res, next) {
    const { customerId } = req.query
    const { gameId } = req.query
    if (customerId?.length > 0) {
        res.locals.filterUser = customerId
    }
    if (gameId?.length > 0) {
        res.locals.filterGame = gameId
    }
    next()
}