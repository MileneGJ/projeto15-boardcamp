import joi from 'joi';

export const categorySchema = joi.object({
    name:joi.string().required()
})

/* name não pode estar vazio ⇒ nesse caso, deve retornar status 400
name não pode ser um nome de categoria já existente ⇒ nesse caso deve retornar status 409 */