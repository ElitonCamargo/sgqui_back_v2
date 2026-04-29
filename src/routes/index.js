import { Router } from 'express';
import { AppError } from '../core/utils/AppError.js';
import autenticar from "../core/middlewares/autenticacao.js";
import autorizar from '../core/middlewares/autorizar.js';
import * as info from '../modules/rbac/info/info.controller.js';
import * as usuario from '../modules/rbac/usuario/usuario.controller.js';

import allRoutesMaps from './allRoutes.maps.js';

const routes = Router();

// Rota publica fixa - sem autenticação e autorização
	// Ex: Rota para obter informações do sistema
	routes.get('/', info.obterInfoSistema);

	// Rota publica fixa - sem autenticação e autorização
	//IMPORTANTE: Remover essa rota em produção por questões de segurança
	routes.get('/rotas', info.endpoints);

	// Ex: Rota para login de usuário
	// routes.post('/rbac/usuario/login', usuario.login);

	// Cria rotas dinâmicas com base nas permissões definidas
allRoutesMaps.forEach((map) => {
	const middlewares = map.middlewares || [];

	routes[map.metodo.toLowerCase()](
		`/${map.modulo}/${map.rota}`,
		// autenticar,
		// autorizar,
		...middlewares, 
		map.functionExec
	);
});


// Middleware para tratar rotas inválidas (deve ser o último middleware de rota)
// Encaminha para o middleware global de erro padronizar a resposta.
routes.use((req, res, next) => {
	return next(new AppError('Rota não encontrada', 404));
});



export default routes;