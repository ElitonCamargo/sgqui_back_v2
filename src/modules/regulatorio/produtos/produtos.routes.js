import * as produtos from '../controllers/produtos.controllers.js';

export default [
  {
    codigo: 'produtos:consultar',
    metodo: 'GET',
    modulo: 'formulacao',
		rota: 'produtos',
    functionExec: produtos.listarFormulacoesLiberadas,
    recurso: 'Produtos',
    descricao: 'Fistar formulação liberadas para cadastro',
    ehPublica: false
  },
];