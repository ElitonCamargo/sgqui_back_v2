import * as garantia from '../../controllers/garantia.controllers.js';

export default [
	{
		codigo: 'garantia:consultarPorNutriente',
		metodo: 'GET',
		rota: '/garantia/nutriente/:nutrienteId',
		functionExec: garantia.consultarPorNutriente,
		recurso: 'Garantias',
		descricao: 'Listar as materiais-primas que possuem de um determinado nutriente',
		ehPublica: false
	},
	{
		codigo: 'garantia:consultarPorMateria_prima',
		metodo: 'GET',
		rota: '/garantia/materia_prima/:materia_primaId',
		functionExec: garantia.consultarPorMateria_prima,
		recurso: 'Garantias',
		descricao: 'Listar as garantias de nutrientes de uma determinada matéria-prima',
		ehPublica: false
	},
	{
		codigo: 'garantia:cadastrar',
		metodo: 'POST',
		rota: '/garantia',
		functionExec: garantia.cadastrar,
		recurso: 'Garantias',
		descricao: 'Cadastrar uma nova garantia de nutriente para uma matéria-prima',
		ehPublica: false
	},
	{
		codigo: 'garantia:alterar',
		metodo: 'PUT',
		rota: '/garantia/:id',
		functionExec: garantia.atualizar,
		recurso: 'Garantias',
		descricao: 'Atualizar uma garantia de nutriente para uma matéria-prima',
		ehPublica: false
	},
	{
		codigo: 'garantia:deletar',
		metodo: 'DELETE',
		rota: '/garantia/:id',
		functionExec: garantia.deletar,
		recurso: 'Garantias',
		descricao: 'Remover garantia de nutriente para uma matéria-prima',
		ehPublica: false
	}
];