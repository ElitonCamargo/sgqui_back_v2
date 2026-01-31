import * as projeto from '../../controllers/projeto.controllers.js';

export default [
  {
    metodo: 'GET',
    rota: '/projeto',
    functionExec: projeto.consultar,
    recurso: 'Projetos',
    descricao: 'Visualizar todos os projetos',
    ehPublica: true
  },
  {
    metodo: 'GET',
    rota: '/projeto/:id',
    functionExec: projeto.consultarPorId,
    recurso: 'Projetos',
    descricao: 'Obter projeto por ID',
    ehPublica: false
  },
  {
    metodo: 'GET',
    rota: '/projeto/codigo/:codigo',
    functionExec: projeto.consultarPorCodigo,
    recurso: 'Projetos',
    descricao: 'Obter projeto por código',
    ehPublica: false
  },
  {
    metodo: 'GET',
    rota: '/projeto/detalhado/:id',
    functionExec: projeto.consultaDetalhada,
    recurso: 'Projetos',
    descricao: 'Obter detalhes do projeto por ID',
    ehPublica: false
  },
  {
    metodo: 'GET',
    rota: '/projeto/data/:inicio/:termino',
    functionExec: projeto.consultarPorData,
    recurso: 'Projetos',
    descricao: 'Listar projetos por período',
    ehPublica: false
  },
  {
    metodo: 'POST',
    rota: '/projeto',
    functionExec: projeto.cadastrar,
    recurso: 'Projetos',
    descricao: 'Cadastrar projeto',
    ehPublica: false
  },
  {
    metodo: 'POST',
    rota: '/projeto/:id',
    functionExec: projeto.duplicar,
    recurso: 'Projetos',
    descricao: 'Duplicar projeto por ID',
    ehPublica: false
  },
  {
    metodo: 'PUT',
    rota: '/projeto/:id',
    functionExec: projeto.alterar,
    recurso: 'Projetos',
    descricao: 'Alterar projeto por ID',
    ehPublica: false
  },
  {
    metodo: 'DELETE',
    rota: '/projeto/:id',
    functionExec: projeto.deletar,
    recurso: 'Projetos',
    descricao: 'Deletar projeto por ID',
    ehPublica: false
  }
];