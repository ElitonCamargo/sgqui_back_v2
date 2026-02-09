import * as configuracao from '../../controllers/configuracao.controllers.js';

export default [
	{
		codigo:'config:cadastrar',
		metodo: 'POST',
		rota: '/configuracao',
		functionExec: configuracao.cadastrar,
		recurso: 'Configurações',
		descricao: 'Cadastrar configuração',
		ehPublica: false
	},
	{
		codigo:'config:consultar',
		metodo: 'GET',
		rota: '/configuracao',
		functionExec: configuracao.consultar,
		recurso: 'Configurações',
		descricao: 'Listar configurações',
		ehPublica: false
	},
	{
		codigo:'config:consultarPorId',
		metodo: 'GET',
		rota: '/configuracao/:key',
		functionExec: configuracao.consultarPorKey,
		recurso: 'Configurações',
		descricao: 'Obter configuração por ID',
		ehPublica: false
	},
	{
		codigo:'config:alterar',
		metodo: 'PUT',
		rota: '/configuracao/:key',
		functionExec: configuracao.alterar,
		recurso: 'Configurações',
		descricao: 'Alterar configuração por ID',
		ehPublica: false
	},
	{
		codigo:'config:deletar',
		metodo: 'DELETE',
		rota: '/configuracao/:key',
		functionExec: configuracao.deletar,
		recurso: 'Configurações',
		descricao: 'Deletar configuração por ID',
		ehPublica: false
	}
];

