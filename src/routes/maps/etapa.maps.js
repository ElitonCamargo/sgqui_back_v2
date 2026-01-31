import * as etapa from '../../controllers/etapa.controllers.js';

export default [
	{
		metodo: 'POST',
		rota: '/etapa',
		functionExec: etapa.cadastrar,
		recurso: 'Etapas',
		descricao: 'Cadastrar etapa',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/etapa/:id',
		functionExec: etapa.consultarPorId,
		recurso: 'Etapas',
		descricao: 'Obter etapa por ID',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/etapa/projeto_id/:id',
		functionExec: etapa.consultarPorProjeto,
		recurso: 'Etapas',
		descricao: 'Listar etapas por projeto',
		ehPublica: false
	},
	{
		metodo: 'PUT',
		rota: '/etapa/:id',
		functionExec: etapa.alterar,
		recurso: 'Etapas',
		descricao: 'Alterar etapa por ID',
		ehPublica: false
	},
	{
		metodo: 'PUT',
		rota: '/etapa/projeto/ordenar/',
		functionExec: etapa.alterarOrdem,
		recurso: 'Etapas',
		descricao: 'Alterar ordem das etapas do projeto',
		ehPublica: false
	},
	{
		metodo: 'DELETE',
		rota: '/etapa/:id',
		functionExec: etapa.deletar,
		recurso: 'Etapas',
		descricao: 'Deletar etapa por ID',
		ehPublica: false
	}
];