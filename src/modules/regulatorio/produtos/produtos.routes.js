import * as produtos from './produtos.controllers.js';

import { validate, validateParams } from '../../../core/middlewares/validate.js';
import { createAutoProdutosSchema, updateProdutosSchema } from './produtos.schema.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
  {
    codigo: 'produtos:cadastrar',
    metodo: 'POST',
    modulo: 'regulatorio',
		rota: 'produtos/:projeto_id',
    middlewares: [autenticar, autorizar, validateParams(createAutoProdutosSchema)],
    functionExec: produtos.cadastrar,
    recurso: 'Produtos',
    descricao: 'Cadastrar um novo produto',
    ehPublica: false
  },
  {
    codigo: 'produtos:deletar',
    metodo: 'DELETE',
    modulo: 'regulatorio',
    rota: 'produtos/:id',
    middlewares: [autenticar, autorizar],
    functionExec: produtos.deletar,
    recurso: 'Produtos',
    descricao: 'Deletar um produto',
    ehPublica: false
  },
  {
    codigo: 'produtos:listar',
    metodo: 'GET',
    modulo: 'regulatorio',
    rota: 'produtos',
    middlewares: [autenticar, autorizar],
    functionExec: produtos.listar,
    recurso: 'Produtos',
    descricao: 'Listar produtos com filtros opcionais',
    ehPublica: false
  },
  {
    codigo: 'produtos:consultarPorId',
    metodo: 'GET',
    modulo: 'regulatorio',
    rota: 'produtos/:id',
    middlewares: [autenticar, autorizar],
    functionExec: produtos.consultarPorId,
    recurso: 'Produtos',
    descricao: 'Consultar um produto por ID',
    ehPublica: false
  },
  {
    codigo: 'produtos:listarDeletados',
    metodo: 'GET',
    modulo: 'regulatorio',
    rota: 'produtos/listar/deletados',
    middlewares: [autenticar, autorizar],
    functionExec: produtos.listarDeletados,
    recurso: 'Produtos',
    descricao: 'Listar produtos deletados',
    ehPublica: false
  },
  {
    codigo: 'produtos:listarStatus',
    metodo: 'GET',
    modulo: 'regulatorio',
    rota: 'produtos/listar/status',
    middlewares: [autenticar, autorizar],
    functionExec: produtos.listarStatus,
    recurso: 'Produtos',
    descricao: 'Listar status disponíveis para os produtos',
    ehPublica: true
  },
  {
    codigo: 'produtos:atualizar',
    metodo: 'PUT',
    modulo: 'regulatorio',
    rota: 'produtos/:id',
    middlewares: [autenticar, autorizar, validate(updateProdutosSchema)],
    functionExec: produtos.atualizar,
    recurso: 'Produtos',
    descricao: 'Atualizar um produto',
    ehPublica: false
  }
];