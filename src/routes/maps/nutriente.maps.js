import * as nutriente from '../../controllers/nutriente.controllers.js';

export default [
	{
		codigo: 'nutriente:consultar',
		metodo: 'GET',
		rota: '/nutriente',
		functionExec: nutriente.consultar,
		recurso: 'Nutrientes',
		descricao: 'Listar nutrientes cadastrados',
		ehPublica: false
	},
	{
		codigo: 'nutriente:consultarPorId',
		metodo: 'GET',
		rota: '/nutriente/:id',
		functionExec: nutriente.consultarPorId,
		recurso: 'Nutrientes',
		descricao: 'Visualizar dados detalhados de um nutriente',
		ehPublica: false
	},
	{
		codigo: 'nutriente:deletar',
		metodo: 'DELETE',
		rota: '/nutriente/:id',
		functionExec: nutriente.deletar,
		recurso: 'Nutrientes',
		descricao: 'Remover nutriente',
		ehPublica: false
	},
	{
		codigo: 'nutriente:cadastrar',
		metodo: 'POST',
		rota: '/nutriente',
		functionExec: nutriente.cadastrada,
		recurso: 'Nutrientes',
		descricao: 'Cadastrar nutriente',
		ehPublica: false
	},
	{
		codigo: 'nutriente:alterar',
		metodo: 'PUT',
		rota: '/nutriente/:id',
		functionExec: nutriente.alterar,
		recurso: 'Nutrientes',
		descricao: 'Alterar dados de um nutriente',
		ehPublica: false
	}
];