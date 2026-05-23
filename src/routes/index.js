import { Router } from 'express';
import { AppError } from '../core/utils/AppError.js';
import * as info from '../modules/rbac/info/info.controller.js';
import allRoutesMaps from './allRoutes.maps.js';

const routes = Router();

routes.get('/', info.obterInfoSistema);

routes.get('/favicon.ico', (req, res) => {
    return res.status(204).end();
});


allRoutesMaps.forEach((route) => {
	const middlewares = route.middlewares || [];
	const path = `/${route.modulo}/${route.rota}`.replace(/\/+/g, '/');
	routes[route.metodo.toLowerCase()](
		path,
		...middlewares, 
		route.functionExec
	);
});


// Middleware para tratar rotas inválidas (deve ser o último middleware de rota)
// Encaminha para o middleware global de erro padronizar a resposta.
routes.use((req, res, next) => {
	return next(new AppError({
		message: 'Rota não encontrada',
		code: 404
	}));
});


export default routes;