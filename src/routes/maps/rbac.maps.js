// src/routes/rbac.js
// RBAC => Role-Based Access Control (Controle de Acesso Baseado em Funções)
import * as usuarioPerfis from '../../controllers/usuarioPerfis.controllers.js';
import * as perfis from '../../controllers/perfis.controllers.js';
import * as perfisPermissoes from '../../controllers/perfisPermissoes.controllers.js';
import * as permissoes from '../../controllers/permissoes.controllers.js';

export default [
	{
		metodo: 'POST',
		rota: '/rbac/usuario_perfis',
		functionExec: usuarioPerfis.vincular,
		recurso: 'RBAC',
		descricao: 'Vincular perfil ao usuário',
		ehPublica: false
	},
	{
		metodo: 'DELETE',
		rota: '/rbac/usuario_perfis/:vinculoID',
		functionExec: usuarioPerfis.desvincular,
		recurso: 'RBAC',
		descricao: 'Desvincular perfil do usuário',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/rbac/usuario_perfis',
		functionExec: usuarioPerfis.listar,
		recurso: 'RBAC',
		descricao: 'Listar vínculos de usuário/perfis',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/rbac/usuario_perfis/usuario/perfis',
		functionExec: usuarioPerfis.listarDoUsuarioLogado,
		recurso: 'RBAC',
		descricao: 'Listar perfis do usuário logado',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/rbac/usuario_perfis/usuario/:usuarioId/perfis',
		functionExec: usuarioPerfis.listarPerfisPorUsuario,
		recurso: 'RBAC',
		descricao: 'Listar perfis por usuário',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/rbac/usuario_perfis/perfil/:perfilId/usuarios',
		functionExec: usuarioPerfis.listarUsuariosPorPerfil,
		recurso: 'RBAC',
		descricao: 'Listar usuários por perfil',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/rbac/perfis',
		functionExec: perfis.listar,
		recurso: 'RBAC',
		descricao: 'Listar perfis',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/rbac/perfis/:id',
		functionExec: perfis.listarPorId,
		recurso: 'RBAC',
		descricao: 'Obter perfil por ID',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/rbac/perfis/nome/:nome',
		functionExec: perfis.listarPorNome,
		recurso: 'RBAC',
		descricao: 'Buscar perfil por nome',
		ehPublica: false
	},
	{
		metodo: 'POST',
		rota: '/rbac/perfis',
		functionExec: perfis.cadastrar,
		recurso: 'RBAC',
		descricao: 'Cadastrar perfil',
		ehPublica: false
	},
	{
		metodo: 'PUT',
		rota: '/rbac/perfis/:id',
		functionExec: perfis.alterar,
		recurso: 'RBAC',
		descricao: 'Alterar perfil por ID',
		ehPublica: false
	},
	{
		metodo: 'DELETE',
		rota: '/rbac/perfis/:id',
		functionExec: perfis.remover,
		recurso: 'RBAC',
		descricao: 'Remover perfil por ID',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/rbac/perfil_permissoes',
		functionExec: perfisPermissoes.listarVinculos,
		recurso: 'RBAC',
		descricao: 'Listar vínculos de perfil/permissões',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/rbac/perfil_permissoes/perfil/:perfilId',
		functionExec: perfisPermissoes.listarVinculos,
		recurso: 'RBAC',
		descricao: 'Listar vínculos de permissões por perfil',
		ehPublica: false
	},
	{
		metodo: 'POST',
		rota: '/rbac/perfil_permissoes',
		functionExec: perfisPermissoes.vincular,
		recurso: 'RBAC',
		descricao: 'Vincular permissão ao perfil',
		ehPublica: false
	},
	{
		metodo: 'DELETE',
		rota: '/rbac/perfil_permissoes/:vinculoID',
		functionExec: perfisPermissoes.desvincular,
		recurso: 'RBAC',
		descricao: 'Desvincular permissão do perfil',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/rbac/permissoes',
		functionExec: permissoes.listarTodas,
		recurso: 'RBAC',
		descricao: 'Listar permissões',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/rbac/permissoes/usuario',
		functionExec: permissoes.listarDoUsuarioLogado,
		recurso: 'RBAC',
		descricao: 'Listar permissões do usuário logado',
		ehPublica: false
	}
];

