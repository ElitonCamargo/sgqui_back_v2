import * as perfisPermissoesController from './perfisPermissoes.controller.js';

export default [
	{
		codigo: 'perfis_permissoes:vincular',
		metodo: 'POST',
		modulo: 'rbac',
		rota: 'perfil_permissoes',
		functionExec: perfisPermissoesController.vincular,
		recurso: 'Controle de Acesso',
		descricao: 'Atribuir permissões aos perfis',
		ehPublica: false
	},
	{
		codigo: 'perfis_permissoes:listarVinculos',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'perfil_permissoes/:perfilId/',
		functionExec: perfisPermissoesController.listarVinculos,
		recurso: 'Controle de Acesso',
		descricao: 'Listar as permissões vinculadas aos perfis',
		ehPublica: false	
	},
	{
		codigo: 'perfis_permissoes:permissoesPerfilAcessos',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'perfil_permissoes/acessos/:perfilId',
		functionExec: perfisPermissoesController.permissoesPerfilAcessos,
		recurso: 'Controle de Acesso',
		descricao: 'Controla os acessos do perfil por meio das permissões vinculadas',
		ehPublica: true		
	}
];
