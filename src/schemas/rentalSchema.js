import joi from 'joi';

export const rentalSchema = joi.object({

}) 

/* - Ao inserir um aluguel, os campos `rentDate` e `originalPrice` devem ser populados automaticamente antes de salvá-lo:
    - `rentDate`: data atual no momento da inserção
    - `originalPrice`: `daysRented` multiplicado pelo preço por dia do jogo no momento da inserção
- Ao inserir um aluguel, os campos `returnDate` e `delayFee` devem sempre começar como `null`
- Ao inserir um aluguel, deve verificar se `customerId` se refere a um cliente existente. Se não, deve responder com **status 400**
- Ao inserir um aluguel, deve verificar se `gameId` se refere a um jogo existente. Se não, deve responder com **status 400**
- `daysRented` deve ser um número maior que 0. Se não, deve responder com **status 400**
- Ao inserir um aluguel, deve-se validar que existem jogos disponíveis, ou seja, que não tem alugueis em aberto acima da quantidade de jogos em estoque. Caso contrário, deve retornar **status 400** */