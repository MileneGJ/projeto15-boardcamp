import joi from 'joi';

export const gameSchema = joi.object({
    name:joi.string().required(),
    image:joi.string().required(),
    stockTotal: joi.number().greater(0).required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().greater(0).required()
})


/* - `name` não pode estar vazio; `stockTotal` e `pricePerDay` devem ser maiores que 0; `categoryId` deve ser um id de categoria existente; ⇒ nesses casos, deve retornar **status 400**
- `name` não pode ser um nome de jogo já existente ⇒ nesse caso deve retornar **status 409** */