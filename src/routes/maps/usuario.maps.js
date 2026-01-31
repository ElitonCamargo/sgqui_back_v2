import * as usuarioController from '../../controllers/usuario.controllers.js';

export default [
  {
    metodo: 'GET',
    rota: '/usuario/logado',
    functionExec: usuarioController.consultarLogado,
    recurso: 'Usuários',
    descricao: 'Obter dados do usuário logado',
    ehPublica: true
  },
  {
    metodo: 'GET',
    rota: '/usuario',
    functionExec: usuarioController.consultar,
    recurso: 'Usuários',
    descricao: 'Listar usuários',
    ehPublica: false
  },
  {
    metodo: 'GET',
    rota: '/usuario/:id',
    functionExec: usuarioController.consultarPorId,
    recurso: 'Usuários',
    descricao: 'Obter usuário por ID',
    ehPublica: false
  },
  {
    metodo: 'PUT',
    rota: '/usuario/perfil',
    functionExec: usuarioController.alterarPerfil,
    recurso: 'Usuários',
    descricao: 'Alterar perfil do usuário logado',
    ehPublica: true
  },
  {
    metodo: 'DELETE',
    rota: '/usuario/perfil',
    recurso: 'Usuários',
    descricao: 'Deletar perfil do usuário logado',
    ehPublica: true,
    functionExec: usuarioController.deletarPerfil
  },
  {
    metodo: 'DELETE',
    rota: '/usuario/:id',
    recurso: 'Usuários',
    descricao: 'Deletar usuário por ID',
    ehPublica: false,
    functionExec: usuarioController.deletar
  },
  {
    metodo: 'PUT',
    rota: '/usuario/:id',
    functionExec: usuarioController.alterar,
    recurso: 'Usuários',
    descricao: 'Alterar usuário por ID',
    ehPublica: false
  },
  {
    metodo: 'POST',
    rota: '/usuario',
    functionExec: usuarioController.cadastrar,
    recurso: 'Usuários',
    descricao: 'Cadastrar novo usuário',
    ehPublica: false
  }
];
