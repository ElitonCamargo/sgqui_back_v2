import * as nutriente from './nutriente.controller.js';
import { validate } from '../../../core/middlewares/validate.js';
import { createNutrienteSchema, updateNutrienteSchema } from './nutriente.schema.js';

export default [
	{
		codigo: 'nutriente:consultar',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'nutriente',
		functionExec: nutriente.consultar,
		recurso: 'Nutrientes',
		descricao: 'Listar nutrientes cadastrados',
		ehPublica: false
	},
	{
		codigo: 'nutriente:consultarPorId',
		metodo: 'GET',
		modulo: 'formulacao',
		rota: 'nutriente/:id',
		functionExec: nutriente.consultarPorId,
		recurso: 'Nutrientes',
		descricao: 'Visualizar dados detalhados de um nutriente',
		ehPublica: false
	},
	{
		codigo: 'nutriente:deletar',
		metodo: 'DELETE',
		modulo: 'formulacao',
		rota: 'nutriente/:id',
		functionExec: nutriente.deletar,
		recurso: 'Nutrientes',
		descricao: 'Remover nutriente',
		ehPublica: false
	},
	{
		codigo: 'nutriente:cadastrar',
		metodo: 'POST',
		modulo: 'formulacao',
		rota: 'nutriente',
		functionExec: nutriente.cadastrada,
        middlewares: [validate(createNutrienteSchema)],
		recurso: 'Nutrientes',
		descricao: 'Cadastrar nutriente',
		ehPublica: false
	},
	{
		codigo: 'nutriente:alterar',
		metodo: 'PUT',
		modulo: 'formulacao',
		rota: 'nutriente/:id',
		functionExec: nutriente.alterar,
        middlewares: [validate(updateNutrienteSchema)],
		recurso: 'Nutrientes',
		descricao: 'Alterar dados de um nutriente',
		ehPublica: false
	}
];
