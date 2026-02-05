// src/routes/rbac.js
// RBAC => Role-Based Access Control (Controle de Acesso Baseado em Funções)
import * as usuarioPerfis from '../../controllers/usuarioPerfis.controllers.js';
import * as perfis from '../../controllers/perfis.controllers.js';
import * as perfisPermissoes from '../../controllers/perfisPermissoes.controllers.js';
import * as permissoes from '../../controllers/permissoes.controllers.js';

export default [
	// Rotas de Perfis
	{
		codigo: 'perfis:listar',
		metodo: 'GET',
		rota: '/rbac/perfis',
		functionExec: perfis.listar,
		recurso: 'Controle de Acesso',
		descricao: 'Listar perfis cadastrados',
		ehPublica: false
	},
	{
		codigo: 'perfis:consultarPorId',
		metodo: 'GET',
		rota: '/rbac/perfis/:id',
		functionExec: perfis.listarPorId,
		recurso: 'Controle de Acesso',
		descricao: 'Visualizar detalhes dos perfis',
		ehPublica: false
	},
	{
		codigo: 'perfis:consultarPorNome',
		metodo: 'GET',
		rota: '/rbac/perfis/nome/:nome',
		functionExec: perfis.listarPorNome,
		recurso: 'Controle de Acesso',
		descricao: 'Consultar/Filtrar perfis por nome',
		ehPublica: false
	},
	{
		codigo: 'perfis:cadastrar',
		metodo: 'POST',
		rota: '/rbac/perfis',
		functionExec: perfis.cadastrar,
		recurso: 'Controle de Acesso',
		descricao: 'Cadastrar novo perfil',
		ehPublica: false
	},
	{
		codigo: 'perfis:alterar',
		metodo: 'PUT',
		rota: '/rbac/perfis/:id',
		functionExec: perfis.alterar,
		recurso: 'Controle de Acesso',
		descricao: 'Alterar informações dos perfis',
		ehPublica: false
	},
	{
		codigo: 'perfis:remover',
		metodo: 'DELETE',
		rota: '/rbac/perfis/:id',
		functionExec: perfis.remover,
		recurso: 'Controle de Acesso',
		descricao: 'Remover perfis',
		ehPublica: false
	},
	// Rotas de Usuário-Perfis
	{
		codigo: 'usuario_perfis:vincular',
		metodo: 'POST',
		rota: '/rbac/usuario_perfis',
		functionExec: usuarioPerfis.vincular,
		recurso: 'Controle de Acesso',
		descricao: 'Vincular usuario a perfis',
		ehPublica: false
	},
	{
		codigo: 'usuario_perfis:desvincular',
		metodo: 'DELETE',
		rota: '/rbac/usuario_perfis/:vinculoID',
		functionExec: usuarioPerfis.desvincular,
		recurso: 'Controle de Acesso',
		descricao: 'Desvincular usuario de perfis',
		ehPublica: false
	},
	{
		codigo: 'usuario_perfis:listar',
		metodo: 'GET',
		rota: '/rbac/usuario_perfis',
		functionExec: usuarioPerfis.listar,
		recurso: 'Controle de Acesso',
		descricao: 'Listar os vínculos entre usuários e perfis',
		ehPublica: false
	},
	{
		codigo: 'usuario_perfis:listarDoUsuarioLogado',
		metodo: 'GET',
		rota: '/rbac/usuario_perfis/usuario/perfis',
		functionExec: usuarioPerfis.listarDoUsuarioLogado,
		recurso: 'Controle de Acesso',
		descricao: 'Listar os perfis vinculados a um usuário logado',
		ehPublica: true
	},
	{
		codigo: 'usuario_perfis:listarPerfisPorUsuario',
		metodo: 'GET',
		rota: '/rbac/usuario_perfis/usuario/:usuarioId/perfis',
		functionExec: usuarioPerfis.listarPerfisPorUsuario,
		recurso: 'Controle de Acesso',
		descricao: 'Listar perfis vinculados a um usuário',
		ehPublica: false
	},
	{
		codigo: 'usuario_perfis:listarUsuariosPorPerfil',
		metodo: 'GET',
		rota: '/rbac/usuario_perfis/perfil/:perfilId/usuarios',
		functionExec: usuarioPerfis.listarUsuariosPorPerfil,
		recurso: 'Controle de Acesso',
		descricao: 'Listar usuários vinculados a um perfil',
		ehPublica: false
	},
	// Rotas de Permissões
	{
		codigo: 'permissoes:listar',
		metodo: 'GET',
		rota: '/rbac/permissoes',
		functionExec: permissoes.listarTodas,
		recurso: 'Controle de Acesso',
		descricao: 'Listar permissões do sistema',
		ehPublica: false
	},	
	{
		codigo: 'permissoes:listarDoUsuarioLogado',
		metodo: 'GET',
		rota: '/rbac/permissoes/usuario',
		functionExec: permissoes.listarDoUsuarioLogado,
		recurso: 'Controle de Acesso',
		descricao: 'Listar permissões do usuário logado',
		ehPublica: true
	},	
	{
		codigo: 'permissoes:listarPorUsuario',
		metodo: 'GET',
		rota: '/rbac/permissoes/usuario/:usuarioId',
		functionExec: permissoes.listarPermissoesPorUsuario,
		recurso: 'Controle de Acesso',
		descricao: 'Listar permissões por usuário',
		ehPublica: false
	},	
	// Rotas de Perfis-Permissões
	{
		codigo: 'perfis_permissoes:listarVinculos',
		metodo: 'GET',
		rota: '/rbac/perfil_permissoes',
		functionExec: perfisPermissoes.listarVinculos,
		recurso: 'Controle de Acesso',
		descricao: 'Listar as permissões vinculadas aos perfis',
		ehPublica: false
	},
	{
		codigo: 'perfis_permissoes:listarVinculosPorPerfil',
		metodo: 'GET',
		rota: '/rbac/perfil_permissoes/perfil/:perfilId',
		functionExec: perfisPermissoes.listarVinculos,
		recurso: 'Controle de Acesso',
		descricao: 'Listar permissões por perfil',
		ehPublica: false
	},
	{
		codigo: 'perfis_permissoes:vincular',
		metodo: 'POST',
		rota: '/rbac/perfil_permissoes',
		functionExec: perfisPermissoes.vincular,
		recurso: 'Controle de Acesso',
		descricao: 'Atribuir permissão ao perfis',
		ehPublica: false
	},
	{
		codigo: 'perfis_permissoes:desvincular',
		metodo: 'DELETE',
		rota: '/rbac/perfil_permissoes/:vinculoID',
		functionExec: perfisPermissoes.desvincular,
		recurso: 'Controle de Acesso',
		descricao: 'Remover permissão de perfis',
		ehPublica: false
	}	
];
