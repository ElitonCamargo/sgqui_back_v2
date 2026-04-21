import * as info from '../../rbac/controllers/info.controllers.js';

export default [
	{
		codigo: 'endpoints:listar',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'endpoints',
		functionExec: info.endpoints,
		recurso: 'Rotas',
		descricao: 'Obtém a lista de endpoints da API.',
		ehPublica: true
	}
];