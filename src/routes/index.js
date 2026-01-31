import { Router } from 'express';
import { AppError } from '../utils/AppError.js';
import autenticar from "../middlewares/autenticacao.js";
import autorizar from '../middlewares/autorizar.js';
import routesMaps from './maps/index.js';

const routes = Router();



// Cria rotas dinâmicas com base nas permissões definidas
routesMaps.forEach((map) => {
	routes[map.metodo.toLowerCase()](map.rota, autenticar, autorizar, map.functionExec);
});


// Middleware para tratar rotas inválidas (deve ser o último middleware de rota)
// Encaminha para o middleware global de erro padronizar a resposta.
routes.use((req, res, next) => {
	return next(new AppError('Rota não encontrada', 404));
});



export default routes;