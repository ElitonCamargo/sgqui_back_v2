import { Router } from 'express';
import { AppError } from '../utils/AppError.js';
import autenticar from "../middlewares/autenticacao.js";
import autorizar from '../middlewares/autorizar.js';
import * as info from '../controllers/info.controllers.js';
import * as usuario from '../controllers/usuario.controllers.js';
import routesMaps from './maps/index.js';

const routes = Router();

// Rota publica fixa - sem autenticação e autorização
	// Ex: Rota para obter informações do sistema
	routes.get('/', info.obterInfoSistema);

	// Rota publica fixa - sem autenticação e autorização
	//IMPORTANTE: Remover essa rota em produção por questões de segurança
	routes.get('/rotas', info.endpoints);

	// Ex: Rota para login de usuário
	routes.post('/usuario/login', usuario.login);

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