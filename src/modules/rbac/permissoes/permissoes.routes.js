import * as permissoesController from './permissoes.controller.js';

export default [	
	{
		codigo: 'permissoes:listar',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'permissoes',
		functionExec: permissoesController.listarTodas,
		recurso: 'Controle de Acesso',
		descricao: 'Listar permissões do sistema',
		ehPublica: false
	},	
	{
		codigo: 'permissoes:listarDoUsuarioLogado',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'permissoes/usuario',
		functionExec: permissoesController.listarDoUsuarioLogado,
		recurso: 'Controle de Acesso',
		descricao: 'Listar permissões do usuário logado',
		ehPublica: true
	},	
	{
		codigo: 'permissoes:listarDisponiveisParaVinculacao',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'permissoes/disponiveis_vinculacao',
		functionExec: permissoesController.listarDisponiveisParaVinculacao,
		recurso: 'Controle de Acesso',
		descricao: 'Listar permissões disponíveis para vinculação',
		ehPublica: true
	},	
	{
		codigo: 'permissoes:listarPorUsuario',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'permissoes/usuario/:usuarioId',
		functionExec: permissoesController.listarPermissoesPorUsuario,
		recurso: 'Controle de Acesso',
		descricao: 'Listar permissões por usuário',
		ehPublica: false
	}
];
