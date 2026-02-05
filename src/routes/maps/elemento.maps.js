import * as elemento from '../../controllers/elemento.controllers.js';

export default [
	{
		codigo:'elemento:consultar',
		metodo: 'GET',
		rota: '/elemento',
		functionExec: elemento.consultar,
		recurso: 'Elementos',
		descricao: 'Exibir dados dos elementos cadastrados',
		ehPublica: true
	},
	{
		codigo:'elemento:consultarPorId',
		metodo: 'GET',
		rota: '/elemento/:id',
		functionExec: elemento.consultarPorId,
		recurso: 'Elementos',
		descricao: 'Exibir dados dos elementos pelo ID',
		ehPublica: true
	},
	{
		codigo:'elemento:consultarPorSimbolo',
		metodo: 'GET',
		rota: '/elemento/simbolo/:simbolo',
		functionExec: elemento.consultarPorSimbolo,
		recurso: 'Elementos',
		descricao: 'Exibir dados dos elementos pelo símbolo',
		ehPublica: true
	},
	// ,
	// {
	// 	metodo: 'DELETE',
	// 	rota: '/elemento/:id',
	// 	functionExec: elemento.deletar,
	// 	recurso: 'Elementos',
	// 	descricao: 'Deletar elemento por ID',
	// 	ehPublica: false
	// },
	// {
	// 	metodo: 'POST',
	// 	rota: '/elemento',
	// 	functionExec: elemento.cadastrada,
	// 	recurso: 'Elementos',
	// 	descricao: 'Cadastrar elemento',
	// 	ehPublica: false
	// },
	// {
	// 	metodo: 'PUT',
	// 	rota: '/elemento/:id',
	// 	functionExec: elemento.alterar,
	// 	recurso: 'Elementos',
	// 	descricao: 'Alterar elemento por ID',
	// 	ehPublica: false
	// }
];