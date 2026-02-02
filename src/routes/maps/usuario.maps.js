import * as usuarioController from '../../controllers/usuario.controllers.js';

export default [
  {
    metodo: 'GET',
    rota: '/usuario/logado',
    functionExec: usuarioController.consultarLogado,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode obter seus próprios dados',
    ehPublica: true
  },
  {
    metodo: 'GET',
    rota: '/usuario',
    functionExec: usuarioController.consultar,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode listar outros usuários',
    ehPublica: false
  },
  {
    metodo: 'GET',
    rota: '/usuario/:id',
    functionExec: usuarioController.consultarPorId,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode listar dados DETALHADOS de outros usuários',
    ehPublica: false
  },
  {
    metodo: 'PUT',
    rota: '/usuario/perfil',
    functionExec: usuarioController.alterarPerfil,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode alterar seu próprio perfil',
    ehPublica: true
  },
  {
    metodo: 'DELETE',
    rota: '/usuario/perfil',
    functionExec: usuarioController.deletarPerfil,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode deletar sua própria conta',
    ehPublica: true
  },
  {
    metodo: 'DELETE',
    rota: '/usuario/:id',
    functionExec: usuarioController.deletar,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode deletar outros usuários',
    ehPublica: false
  },
  {
    metodo: 'PUT',
    rota: '/usuario/:id',
    functionExec: usuarioController.alterar,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode alterar outros usuários',
    ehPublica: false
  },
  {
    metodo: 'POST',
    rota: '/usuario',
    functionExec: usuarioController.cadastrar,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode cadastrar novos usuários',
    ehPublica: false
  }
];
