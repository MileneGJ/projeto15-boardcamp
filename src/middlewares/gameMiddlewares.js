export function gameVerify () {
    
}

export function getByName (req,res,next) {
    const name = req.query.name
    if (name.length > 0) {
        res.locals.condition = `WHERE name ILIKE ${req.query.name}%`
    } else {
        res.locals.condition = ""
    }
    next()
}