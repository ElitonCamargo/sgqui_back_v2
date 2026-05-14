import * as projeto from './projeto.controller.js';
import { validateQuery, validateParams } from '../../../core/middlewares/validate.js';
import { searchProjetoSchema, getByIdSchema } from './projeto.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
  {
    codigo: 'projeto:listarLiberados',
    metodo: 'GET',
    modulo: 'regulatorio',
		rota: 'projeto',
    middlewares: [autenticar, autorizar, validateQuery(searchProjetoSchema)],
    functionExec: projeto.listarLiberados,
    recurso: 'Projetos',
    descricao: 'Listar projetos com status "Liberado"',
    ehPublica: false
  },
  {
    codigo: 'projeto:visualizarFormulacao',
    metodo: 'GET',
    modulo: 'regulatorio',
		rota: 'projeto/:id',
    middlewares: [autenticar, autorizar, validateParams(getByIdSchema)],
    functionExec: projeto.visualizarFormulacao,
    recurso: 'Projetos',
    descricao: 'Visualizar detalhes da formulação de um projeto específico',
    ehPublica: false
  }
];
