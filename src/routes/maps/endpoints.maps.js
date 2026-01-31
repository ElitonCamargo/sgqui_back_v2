import * as info from '../../controllers/info.controllers.js';

export default [
	{
		metodo: 'GET',
		rota: '/endpoints',
		functionExec: info.endpoints,
		recurso: 'Info',
		descricao: 'Obter informações do sistema',
		ehPublica: true
	}
];