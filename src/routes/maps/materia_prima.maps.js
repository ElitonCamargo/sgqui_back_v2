import * as materia_prima from '../../controllers/materia_prima.controllers.js';

export default [
	{
		codigo: 'materia_prima:consultar',
		metodo: 'GET',
		rota: '/materia_prima',
		functionExec: materia_prima.consultar,
		recurso: 'Matérias-primas',
		descricao: 'Listar matérias-primas cadastradas',
		ehPublica: false
	},
	{
		codigo: 'materia_prima:consultarPorId',
		metodo: 'GET',
		rota: '/materia_prima/:id',
		functionExec: materia_prima.consultarPorId,
		recurso: 'Matérias-primas',
		descricao: 'Visualizar dados detalhados de uma matéria-prima',
		ehPublica: false
	},
	{
		codigo: 'materia_prima:consultarMP_percentual_nutriente',
		metodo: 'GET',
		rota: '/materia_prima/compor_projeto/:nutriente/:percentual',
		functionExec: materia_prima.consultarMP_precentual_nutriente,
		recurso: 'Matérias-primas',
		descricao: 'Listar matérias-primas que possuam um percentual de um nutriente desejado',
		ehPublica: false
	},
	{
		codigo: 'materia_prima:deletar',
		metodo: 'DELETE',
		rota: '/materia_prima/:id',
		functionExec: materia_prima.deletar,
		recurso: 'Matérias-primas',
		descricao: 'Remover matéria-prima',
		ehPublica: false
	},
	{
		codigo: 'materia_prima:cadastrar',
		metodo: 'POST',
		rota: '/materia_prima',
		functionExec: materia_prima.cadastrar,
		recurso: 'Matérias-primas',
		descricao: 'Cadastrar matéria-prima',
		ehPublica: false
	},
	{
		codigo: 'materia_prima:alterar',
		metodo: 'PUT',
		rota: '/materia_prima/:id',
		functionExec: materia_prima.alterar,
		recurso: 'Matérias-primas',
		descricao: 'Alterar os dados de uma matéria-prima',
		ehPublica: false
	}
];