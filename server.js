import express from 'express';

import app from './src/app.js';

import { connectDatabaseStatus } from './src/core/utils/helpers.js';



const server = express();

server.use(app);

const dbConnection = await connectDatabaseStatus();
if (!dbConnection.connected) {
    console.error('Erro ao conectar ao banco de dados:', dbConnection.message);
    process.exit(1); 
}

const PORT = 3031; 
app.listen(PORT,()=>{
    console.log(
        `API: Rodando - PORT: ${PORT}`,
        `Link de acesso local: http://localhost:${PORT}/`
    );
});


