import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
    
// Corpo {Request Body}: Dados paara criação ou atualização de um registro
// Route Params: identifica qual recurso atualizar ou deletar 
// Query Params: Paginação, filtros, ordenação

app.use(routes);

//localhost:3333/users

app.listen(3333);