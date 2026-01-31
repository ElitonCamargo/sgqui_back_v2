import * as garantia from '../../controllers/garantia.controllers.js';

export default [
	{
		metodo: 'GET',
		rota: '/garantia/nutriente/:nutrienteId',
		functionExec: garantia.consultarPorNutriente,
		recurso: 'Garantias',
		descricao: 'Listar garantias por nutriente',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/garantia/materia_prima/:materia_primaId',
		functionExec: garantia.consultarPorMateria_prima,
		recurso: 'Garantias',
		descricao: 'Listar garantias por matéria-prima',
		ehPublica: false
	},
	{
		metodo: 'POST',
		rota: '/garantia',
		functionExec: garantia.cadastrar,
		recurso: 'Garantias',
		descricao: 'Cadastrar garantia',
		ehPublica: false
	},
	{
		metodo: 'PUT',
		rota: '/garantia/:id',
		functionExec: garantia.atualizar,
		recurso: 'Garantias',
		descricao: 'Atualizar garantia por ID',
		ehPublica: false
	},
	{
		metodo: 'DELETE',
		rota: '/garantia/:id',
		functionExec: garantia.deletar,
		recurso: 'Garantias',
		descricao: 'Deletar garantia por ID',
		ehPublica: false
	}
];