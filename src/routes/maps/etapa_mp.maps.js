import * as etapa_mp from '../../controllers/etapa_mp.controllers.js';

export default [
	{
		metodo: 'POST',
		rota: '/etapa_mp',
		functionExec: etapa_mp.cadastrar,
		recurso: 'Formulação',
		descricao: 'Adicionar matéria-prima à etapa',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/etapa_mp/:id',
		functionExec: etapa_mp.consultarPorId,
		recurso: 'Formulação',
		descricao: 'Visualização detalhada de uma matéria-prima em uma etapa',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/etapa_mp/etapa/:id',
		functionExec: etapa_mp.consultarPorEtapa,
		recurso: 'Formulação',
		descricao: 'Visualização das matérias-primas de uma etapa',
		ehPublica: false
	},
	{
		metodo: 'PUT',
		rota: '/etapa_mp/:id',
		functionExec: etapa_mp.alterar,
		recurso: 'Formulação',
		descricao: 'Alterar matéria-prima presente na etapa',
		ehPublica: false
	},
	{
		metodo: 'PUT',
		rota: '/etapa_mp/ordenar/m_p/',
		functionExec: etapa_mp.alterarOrdem,
		recurso: 'Formulação',
		descricao: 'Alterar ordem das matérias-primas na etapa',
		ehPublica: false
	},
	{
		metodo: 'DELETE',
		rota: '/etapa_mp/:id',
		functionExec: etapa_mp.deletar,
		recurso: 'Formulação',
		descricao: 'Remover matéria-prima de uma etapa',
		ehPublica: false
	}
];