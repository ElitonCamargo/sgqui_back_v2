import * as etapa_mp from '../../controllers/etapa_mp.controllers.js';

export default [
	{
		metodo: 'POST',
		rota: '/etapa_mp',
		functionExec: etapa_mp.cadastrar,
		recurso: 'Etapas MP',
		descricao: 'Cadastrar etapa de matéria-prima',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/etapa_mp/:id',
		functionExec: etapa_mp.consultarPorId,
		recurso: 'Etapas MP',
		descricao: 'Obter etapa de matéria-prima por ID',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/etapa_mp/etapa/:id',
		functionExec: etapa_mp.consultarPorEtapa,
		recurso: 'Etapas MP',
		descricao: 'Listar etapas de matéria-prima por etapa',
		ehPublica: false
	},
	{
		metodo: 'PUT',
		rota: '/etapa_mp/:id',
		functionExec: etapa_mp.alterar,
		recurso: 'Etapas MP',
		descricao: 'Alterar etapa de matéria-prima por ID',
		ehPublica: false
	},
	{
		metodo: 'PUT',
		rota: '/etapa_mp/ordenar/m_p/',
		functionExec: etapa_mp.alterarOrdem,
		recurso: 'Etapas MP',
		descricao: 'Alterar ordem das matérias-primas na etapa',
		ehPublica: false
	},
	{
		metodo: 'DELETE',
		rota: '/etapa_mp/:id',
		functionExec: etapa_mp.deletar,
		recurso: 'Etapas MP',
		descricao: 'Deletar etapa de matéria-prima por ID',
		ehPublica: false
	}
];