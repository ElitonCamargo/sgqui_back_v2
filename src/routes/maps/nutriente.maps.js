import * as nutriente from '../../controllers/nutriente.controllers.js';

export default [
	{
		metodo: 'GET',
		rota: '/nutriente',
		functionExec: nutriente.consultar,
		recurso: 'Nutrientes',
		descricao: 'Listar nutrientes',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/nutriente/:id',
		functionExec: nutriente.consultarPorId,
		recurso: 'Nutrientes',
		descricao: 'Obter nutriente por ID',
		ehPublica: false
	},
	{
		metodo: 'DELETE',
		rota: '/nutriente/:id',
		functionExec: nutriente.deletar,
		recurso: 'Nutrientes',
		descricao: 'Deletar nutriente por ID',
		ehPublica: false
	},
	{
		metodo: 'POST',
		rota: '/nutriente',
		functionExec: nutriente.cadastrada,
		recurso: 'Nutrientes',
		descricao: 'Cadastrar nutriente',
		ehPublica: false
	},
	{
		metodo: 'PUT',
		rota: '/nutriente/:id',
		functionExec: nutriente.alterar,
		recurso: 'Nutrientes',
		descricao: 'Alterar nutriente por ID',
		ehPublica: false
	}
];