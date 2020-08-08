import express from 'express';

const app = express();

app.use(express.json());
    
// Corpo {Request Body}: Dados paara criação ou atualização de um registro
// Route Params: identifica qual recurso atualizar ou deletar 
// Query Params: Paginação, filtros, ordenação


app.get('/users', (request, response) => {
    console.log(request.query)


    const users = [
        {
            name:"Guilherme",
            age: 23
        },
        {
            name:"Diego",
            age: 25
        }
    ]

    return response.json(users)
})
//localhost:3333/users

app.listen(3333);