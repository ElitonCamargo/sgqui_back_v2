import * as materia_prima from '../../controllers/materia_prima.controllers.js';

export default [
	{
		metodo: 'GET',
		rota: '/materia_prima',
		functionExec: materia_prima.consultar,
		recurso: 'Matérias-primas',
		descricao: 'Listar matérias-primas',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/materia_prima/:id',
		functionExec: materia_prima.consultarPorId,
		recurso: 'Matérias-primas',
		descricao: 'Obter matéria-prima por ID',
		ehPublica: false
	},
	{
		metodo: 'GET',
		rota: '/materia_prima/compor_projeto/:nutriente/:percentual',
		functionExec: materia_prima.consultarMP_precentual_nutriente,
		recurso: 'Matérias-primas',
		descricao: 'Consultar matérias-primas por nutriente e percentual',
		ehPublica: false
	},
	{
		metodo: 'DELETE',
		rota: '/materia_prima/:id',
		functionExec: materia_prima.deletar,
		recurso: 'Matérias-primas',
		descricao: 'Deletar matéria-prima por ID',
		ehPublica: false
	},
	{
		metodo: 'POST',
		rota: '/materia_prima',
		functionExec: materia_prima.cadastrada,
		recurso: 'Matérias-primas',
		descricao: 'Cadastrar matéria-prima',
		ehPublica: false
	},
	{
		metodo: 'PUT',
		rota: '/materia_prima/:id',
		functionExec: materia_prima.alterar,
		recurso: 'Matérias-primas',
		descricao: 'Alterar matéria-prima por ID',
		ehPublica: false
	}
];