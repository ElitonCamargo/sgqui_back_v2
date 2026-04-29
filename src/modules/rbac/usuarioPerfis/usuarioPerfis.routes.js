import * as usuarioPerfisController from './usuarioPerfis.controller.js';


export default [
	{
		codigo: 'usuario_perfis:vincular',
		metodo: 'POST',
		modulo: 'rbac',
		rota: 'usuario_perfis',
		functionExec: usuarioPerfisController.vincular,
		recurso: 'Controle de Acesso',
		descricao: 'Vincular usuario a perfis',
		ehPublica: false
	},
	{
		codigo: 'usuario_perfis:desvincular',
		metodo: 'DELETE',
		modulo: 'rbac',
		rota: 'usuario_perfis/:vinculoID',
		functionExec: usuarioPerfisController.desvincular,
		recurso: 'Controle de Acesso',
		descricao: 'Desvincular usuario de perfis',
		ehPublica: false
	},
	{
		codigo: 'usuario_perfis:listar',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'usuario_perfis',
		functionExec: usuarioPerfisController.listar,
		recurso: 'Controle de Acesso',
		descricao: 'Listar os vínculos entre usuários e perfis',
		ehPublica: false
	},
	{
		codigo: 'usuario_perfis:listarDoUsuarioLogado',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'usuario_perfis/usuario/perfis',
		functionExec: usuarioPerfisController.listarDoUsuarioLogado,
		recurso: 'Controle de Acesso',
		descricao: 'Listar os perfis vinculados a um usuário logado',
		ehPublica: true
	},
	{
		codigo: 'usuario_perfis:listarPerfisPorUsuario',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'usuario_perfis/usuario/:usuarioId/perfis',
		functionExec: usuarioPerfisController.listarPerfisPorUsuario,
		recurso: 'Controle de Acesso',
		descricao: 'Listar perfis vinculados a um usuário',
		ehPublica: false
	},
	{
		codigo: 'usuario_perfis:listarUsuariosPorPerfil',
		metodo: 'GET',
		modulo: 'rbac',
		rota: 'usuario_perfis/perfil/:perfilId/usuarios',
		functionExec: usuarioPerfisController.listarUsuariosPorPerfil,
		recurso: 'Controle de Acesso',
		descricao: 'Listar usuários vinculados a um perfil',
		ehPublica: false
	}	
];
