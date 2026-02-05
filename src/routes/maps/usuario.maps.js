import * as usuarioController from '../../controllers/usuario.controllers.js';

export default [
  {
    codigo: 'usuario:consultarLogado',
    metodo: 'GET',
    rota: '/usuario/logado',
    functionExec: usuarioController.consultarLogado,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode obter seus próprios dados',
    ehPublica: true
  },
  {
    codigo: 'usuario:consultar',
    metodo: 'GET',
    rota: '/usuario',
    functionExec: usuarioController.consultar,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode listar outros usuários',
    ehPublica: false
  },
  {
    codigo: 'usuario:consultarPorId',
    metodo: 'GET',
    rota: '/usuario/:id',
    functionExec: usuarioController.consultarPorId,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode listar dados DETALHADOS de outros usuários',
    ehPublica: false
  },
  {
    codigo: 'usuario:alterarPerfilLogado',
    metodo: 'PUT',
    rota: '/usuario/perfil',
    functionExec: usuarioController.alterarPerfil,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode alterar seu próprio perfil',
    ehPublica: true
  },
  {
    codigo: 'usuario:deletarPerfilLogado',
    metodo: 'DELETE',
    rota: '/usuario/perfil',
    functionExec: usuarioController.deletarPerfil,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode deletar sua própria conta',
    ehPublica: true
  },
  {
    codigo: 'usuario:deletar',
    metodo: 'DELETE',
    rota: '/usuario/:id',
    functionExec: usuarioController.deletar,
    recurso: 'Usuários',
    descricao: 'Remover usuários do sistema',
    ehPublica: false
  },
  {
    codigo: 'usuario:alterar',
    metodo: 'PUT',
    rota: '/usuario/:id',
    functionExec: usuarioController.alterar,
    recurso: 'Usuários',
    descricao: 'Alterar informações de usuários do sistema',
    ehPublica: false
  },
  {
    codigo: 'usuario:cadastrar',
    metodo: 'POST',
    rota: '/usuario',
    functionExec: usuarioController.cadastrar,
    recurso: 'Usuários',
    descricao: 'Cadastrar novos usuários no sistema',
    ehPublica: false
  }
];
