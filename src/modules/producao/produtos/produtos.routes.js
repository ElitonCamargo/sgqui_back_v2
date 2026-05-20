import * as produtos from './produtos.controllers.js';
import autenticar from '../../../core/middlewares/autenticacao.js';
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
  {
    codigo: 'produtos:listar',
    metodo: 'GET',
    modulo: 'producao',
    rota: 'produtos',
    middlewares: [autenticar, autorizar],
    functionExec: produtos.listar,
    recurso: 'Produtos',
    descricao: 'Listar produtos liberados para produção',
    ehPublica: false
  },
  {
    codigo: 'produtos:consultarPorId',
    metodo: 'GET',
    modulo: 'producao',
    rota: 'produtos/:id',
    middlewares: [autenticar, autorizar],
    functionExec: produtos.consultarPorId,
    recurso: 'Produtos',
    descricao: 'Exibir detalhes e formulação de um produto para produção',
    ehPublica: false
  }
];