import { Router } from 'express';
import * as responses from '../utils/responses.js';

import infoRoutes from './info.js';
import usuarioRoutes from './usuarioRoute.js';
//import autenticacao from './src/routes/autenticacao.js';
//import * as middleware from './src/controllers/token.js';
//import nutriente from './src/routes/nutriente.js';
//import elemento from './src/routes/elemento.js';
//import materia_prima from './src/routes/materia_prima.js';
//import garantia from './src/routes/garantia.js';
//import projeto from './src/routes/projeto.js';
//import etapa from './src/routes/etapa.js';
//import etapa_mp from './src/routes/etapa_mp.js';
//import configuracao from './src/routes/configuracao.js';
//import upload from './src/controllers/upload.js';


const routes = Router();

routes.use('/', infoRoutes);
routes.use('/', usuarioRoutes);

// routes.use('/', elemento);
// routes.use('/', nutriente);
// routes.use('/', materia_prima);
// routes.use('/', garantia);
// routes.use('/', projeto);
// routes.use('/',etapa);
// routes.use('/',etapa_mp);
// routes.use('/',configuracao);
// routes.use('/',upload);

// Middleware para tratar rotas inválidas (deve ser o último middleware de rota)
routes.use((req, res, next) => {
    if (!res.headersSent) {
        return responses.notFound(res, { message: 'Rota não encontrada' });
    }
});

// Middleware de tratamento de erros (deve ser o último)
routes.use((err, req, res, next) => {
    console.error(err.stack);
    if (!res.headersSent) {
        return responses.error(res, { message: err.message || 'Erro interno no servidor' });
    }
});

export default routes;
