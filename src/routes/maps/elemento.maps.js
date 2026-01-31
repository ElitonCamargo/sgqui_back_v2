import * as elemento from '../../controllers/elemento.controllers.js';

export default [
	{
		metodo: 'GET',
		rota: '/elemento',
		functionExec: elemento.consultar,
		recurso: 'Elementos',
		descricao: 'Listar elementos',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/elemento/:id',
		functionExec: elemento.consultarPorId,
		recurso: 'Elementos',
		descricao: 'Obter elemento por ID',
		ehPublica: false
	},
	{
		metodo: 'DELETE',
		rota: '/elemento/:id',
		functionExec: elemento.deletar,
		recurso: 'Elementos',
		descricao: 'Deletar elemento por ID',
		ehPublica: false
	},
	{
		metodo: 'POST',
		rota: '/elemento',
		functionExec: elemento.cadastrada,
		recurso: 'Elementos',
		descricao: 'Cadastrar elemento',
		ehPublica: false
	},
	{
		metodo: 'PUT',
		rota: '/elemento/:id',
		functionExec: elemento.alterar,
		recurso: 'Elementos',
		descricao: 'Alterar elemento por ID',
		ehPublica: false
	}
];