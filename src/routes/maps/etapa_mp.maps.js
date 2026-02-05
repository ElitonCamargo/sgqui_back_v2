import * as etapa_mp from '../../controllers/etapa_mp.controllers.js';

export default [
	{
		codigo: 'etapa_mp:cadastrar',
		metodo: 'POST',
		rota: '/etapa_mp',
		functionExec: etapa_mp.cadastrar,
		recurso: 'Projetos',
		descricao: 'Adicionar matéria-prima à etapa',
		ehPublica: false
	},
	{
		codigo: 'etapa_mp:consultarPorId',
		metodo: 'GET',
		rota: '/etapa_mp/:id',
		functionExec: etapa_mp.consultarPorId,
		recurso: 'Projetos',
		descricao: 'Visualizar uma matéria-prima especifica presente na etapa',
		ehPublica: false
	},
	{
		codigo: 'etapa_mp:consultarPorEtapa',
		metodo: 'GET',
		rota: '/etapa_mp/etapa/:id',
		functionExec: etapa_mp.consultarPorEtapa,
		recurso: 'Projetos',
		descricao: 'Visualizar as matérias-primas de uma etapa',
		ehPublica: false
	},
	{
		codigo: 'etapa_mp:alterar',
		metodo: 'PUT',
		rota: '/etapa_mp/:id',
		functionExec: etapa_mp.alterar,
		recurso: 'Projetos',
		descricao: 'Alterar dados de uma matéria-prima presente em uma etapa',
		ehPublica: false
	},
	{
		codigo: 'etapa_mp:alterarOrdem',
		metodo: 'PUT',
		rota: '/etapa_mp/ordenar/m_p/',
		functionExec: etapa_mp.alterarOrdem,
		recurso: 'Projetos',
		descricao: 'Alterar a ordem das matérias-primas presentes na etapa',
		ehPublica: false
	},
	{
		codigo: 'etapa_mp:deletar',
		metodo: 'DELETE',
		rota: '/etapa_mp/:id',
		functionExec: etapa_mp.deletar,
		recurso: 'Projetos',
		descricao: 'Remover matérias-primas de uma etapa',
		ehPublica: false
	}
];