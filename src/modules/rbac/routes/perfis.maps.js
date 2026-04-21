import * as perfisController from '../controllers/perfis.controllers.js';


export default [
	{
		codigo: 'perfis:listar',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'perfis',
		functionExec: perfisController.listar,
		recurso: 'Controle de Acesso',
		descricao: 'Listar perfis cadastrados',
		ehPublica: false
	},
	{
		codigo: 'perfis:consultarPorId',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'perfis/:id',
		functionExec: perfisController.listarPorId,
		recurso: 'Controle de Acesso',
		descricao: 'Visualizar detalhes dos perfis',
		ehPublica: false
	},
	{
		codigo: 'perfis:consultarPorNome',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'perfis/nome/:nome',
		functionExec: perfisController.listarPorNome,
		recurso: 'Controle de Acesso',
		descricao: 'Consultar/Filtrar perfis por nome',
		ehPublica: false
	},
	{
		codigo: 'perfis:cadastrar',
		metodo: 'POST',
		modulo: 'rbac',
		rota: 'perfis',
		functionExec: perfisController.cadastrar,
		recurso: 'Controle de Acesso',
		descricao: 'Cadastrar novo perfil',
		ehPublica: false
	},
	{
		codigo: 'perfis:alterar',
		metodo: 'PUT',
		modulo: 'rbac',
		rota: 'perfis/:id',
		functionExec: perfisController.alterar,
		recurso: 'Controle de Acesso',
		descricao: 'Alterar informações dos perfis',
		ehPublica: false
	},
	{
		codigo: 'perfis:remover',
		metodo: 'DELETE',
		modulo: 'rbac',
		rota: 'perfis/:id',
		functionExec: perfisController.remover,
		recurso: 'Controle de Acesso',
		descricao: 'Remover perfis',
		ehPublica: false
	}	
];
