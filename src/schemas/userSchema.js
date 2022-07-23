import joi from 'joi';

export const userSchema = joi.object({
    name:joi.string().required(),
    phone:joi.string().regex(/^[0-9]{10,11}$/).required(),
    cpf:joi.string().regex(/^[0-9]{11}$/).required(),
    birthday:joi.date().required()

})

/*- `cpf` deve ser uma string com 11 caracteres numéricos; `phone` deve ser uma string com 10 ou 11 caracteres numéricos; `name` não pode ser uma string vazia; `birthday` deve ser uma data válida; ⇒ nesses casos, deve retornar **status 400**
- `cpf` não pode ser de um cliente já existente; ⇒ nesse caso deve retornar **status 409***/