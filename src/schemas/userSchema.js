import joi from 'joi';

export const userSchema = joi.object({

})

/*- `cpf` deve ser uma string com 11 caracteres numéricos; `phone` deve ser uma string com 10 ou 11 caracteres numéricos; `name` não pode ser uma string vazia; `birthday` deve ser uma data válida; ⇒ nesses casos, deve retornar **status 400**
- `cpf` não pode ser de um cliente já existente; ⇒ nesse caso deve retornar **status 409***/