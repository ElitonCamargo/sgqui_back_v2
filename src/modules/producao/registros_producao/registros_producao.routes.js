import * as registros_ProducaoController from './registros_producao.controllers.js';

import { validate } from '../../../core/middlewares/validate.js';
import { createRegistrosProdSchema, updateRegistrosProdSchema} from './registros_producao.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
  {
    codigo: 'registros_producao:cadastrar',
    metodo: 'POST',
    modulo: 'producao',
		rota: 'registros_producao',
    middlewares: [autenticar, autorizar, validate(createRegistrosProdSchema)],
    functionExec: registros_ProducaoController.cadastrar,
    recurso: 'Registros-Produção',
    descricao: 'Registrar a produção de um produto.',
    ehPublica: false
  },
  {
    codigo: 'registros_producao:listar',
    metodo: 'GET',
    modulo: 'producao',
    rota: 'registros_producao',
    middlewares: [autenticar, autorizar],
    functionExec: registros_ProducaoController.listar,
    recurso: 'Registros-Produção',
    descricao: 'Listar registros de produção com filtros opcionais',
    ehPublica: false
  },
  {
    codigo: 'registros_producao:consultarPorId',
    metodo: 'GET',
    modulo: 'producao',
    rota: 'registros_producao/:id',
    middlewares: [autenticar, autorizar],
    functionExec: registros_ProducaoController.consultarPorId,
    recurso: 'Registros-Produção',
    descricao: 'Consultar um registro de produção por ID',
    ehPublica: false
  },
  {
    codigo: 'registros_producao:deletar',
    metodo: 'DELETE',
    modulo: 'producao',
    rota: 'registros_producao/:id',
    middlewares: [autenticar, autorizar],
    functionExec: registros_ProducaoController.deletar,
    recurso: 'Registros-Produção',
    descricao: 'Deletar um registro de produção',
    ehPublica: false
  },
  {
    codigo: 'registros_producao:listarDeletados',
    metodo: 'GET',
    modulo: 'producao',
    rota: 'registros_producao/listar/deletados',
    middlewares: [autenticar, autorizar],
    functionExec: registros_ProducaoController.listarDeletados,
    recurso: 'Registros-Produção',
    descricao: 'Listar registros de produção deletados',
    ehPublica: false
  },
  {
    codigo: 'registros_producao:atualizar',
    metodo: 'PUT',
    modulo: 'producao',
    rota: 'registros_producao/:id',
    middlewares: [autenticar, autorizar, validate(updateRegistrosProdSchema)],
    functionExec: registros_ProducaoController.atualizar,
    recurso: 'Registros-Produção',
    descricao: 'Atualizar um registro de produção por ID',
    ehPublica: false
  }
];