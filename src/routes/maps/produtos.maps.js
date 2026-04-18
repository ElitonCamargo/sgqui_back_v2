import * as produtos from '../../controllers/produtos.controllers.js';

export default [
  {
    codigo: 'produtos:consultar',
    metodo: 'GET',
    rota: '/produtos',
    functionExec: produtos.listarFormulacoesLiberadas,
    recurso: 'Produtos',
    descricao: 'Fistar formulação liberadas para cadastro',
    ehPublica: false
  },
  // {
  //   codigo: 'projeto:consultarPorId',
  //   metodo: 'GET',
  //   rota: '/projeto/:id',
  //   functionExec: projeto.consultarPorId,
  //   recurso: 'Projetos',
  //   descricao: 'Consultar um projeto pelo seu ID',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:consultarPorCodigo',
  //   metodo: 'GET',
  //   rota: '/projeto/codigo/:codigo',
  //   functionExec: projeto.consultarPorCodigo,
  //   recurso: 'Projetos',
  //   descricao: 'Consultar um projeto pelo seu código',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:consultarDetalhado',
  //   metodo: 'GET',
  //   rota: '/projeto/detalhado/:id',
  //   functionExec: projeto.consultaDetalhada,
  //   recurso: 'Projetos',
  //   descricao: 'Visualizar a formulação detalhada de um projeto',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:consultarPorData',
  //   metodo: 'GET',
  //   rota: '/projeto/data/:inicio/:termino',
  //   functionExec: projeto.consultarPorData,
  //   recurso: 'Projetos',
  //   descricao: 'Listar projetos por período',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:cadastrar',
  //   metodo: 'POST',
  //   rota: '/projeto',
  //   functionExec: projeto.cadastrar,
  //   recurso: 'Projetos',
  //   descricao: 'Cadastrar projeto',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:duplicar',
  //   metodo: 'POST',
  //   rota: '/projeto/:id',
  //   functionExec: projeto.duplicar,
  //   recurso: 'Projetos',
  //   descricao: 'Duplicar projeto',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:alterar',
  //   metodo: 'PUT',
  //   rota: '/projeto/:id',
  //   functionExec: projeto.alterar,
  //   recurso: 'Projetos',
  //   descricao: 'Alterar projeto',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:addResultado',
  //   metodo: 'PUT',
  //   rota: '/projeto/:id/resultado',
  //   functionExec: projeto.addResultado,
  //   recurso: 'Projetos',
  //   descricao: 'Cadastrar resultados (Acompanhamento)',
  //   ehPublica: false
  // },
  // {
  //   codigo: 'projeto:deletar',
  //   metodo: 'DELETE',
  //   rota: '/projeto/:id',
  //   functionExec: projeto.deletar,
  //   recurso: 'Projetos',
  //   descricao: 'Deletar projeto',
  //   ehPublica: false
  // }

];