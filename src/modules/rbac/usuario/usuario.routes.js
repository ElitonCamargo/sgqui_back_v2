import * as usuarioController from './usuario.controller.js';
import { validate } from '../../../core/middlewares/validate.js';
import { createUsuarioSchema, updateUsuarioSchema } from './usuario.schema.js';
import autenticar from "../../../core/middlewares/autenticacao.js";
import autorizar from '../../../core/middlewares/autorizar.js';

export default [
  {
    codigo: 'usuario:login',
    metodo: 'POST',
    modulo: 'rbac',
    rota: 'usuario/login',
    functionExec:usuarioController.login,
    middlewares: [],
    recurso: 'Usuários',
    descricao: 'Autenticar usuário e obter token de acesso',
    ehPublica: true
  },
  {
    codigo: 'usuario:consultarLogado',
    metodo: 'GET',
    modulo: 'rbac',
		rota: 'usuario/logado',
    functionExec: usuarioController.consultarLogado,
    middlewares: [autenticar, autorizar],
    recurso: 'Usuários',
    descricao: 'Usuário logado pode obter seus próprios dados',
    ehPublica: true
  },
  {
    codigo: 'usuario:consultar',
    metodo: 'GET',
    modulo: 'rbac',
		rota: 'usuario',
    functionExec: usuarioController.consultar,
    middlewares: [autenticar, autorizar],
    recurso: 'Usuários',
    descricao: 'Usuário logado pode listar outros usuários',
    ehPublica: false
  },
  {
    codigo: 'usuario:consultarPorId',
    metodo: 'GET',
    modulo: 'rbac',
		rota: 'usuario/:id',
    functionExec: usuarioController.consultarPorId,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode listar dados DETALHADOS de outros usuários',
    ehPublica: false
  },
  {
    codigo: 'usuario:alterarPerfilLogado',
    metodo: 'PUT',
    modulo: 'rbac',
		rota: 'usuario/perfil',
    functionExec: usuarioController.alterarPerfil,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode alterar seu próprio perfil',
    ehPublica: true
  },
  {
    codigo: 'usuario:deletarPerfilLogado',
    metodo: 'DELETE',
    modulo: 'rbac',
		rota: 'usuario/perfil',
    functionExec: usuarioController.deletarPerfil,
    recurso: 'Usuários',
    descricao: 'Usuário logado pode deletar sua própria conta',
    ehPublica: true
  },
  {
    codigo: 'usuario:deletar',
    metodo: 'DELETE',
    modulo: 'rbac',
		rota: 'usuario/:id',
    functionExec: usuarioController.deletar,
    recurso: 'Usuários',
    descricao: 'Remover usuários do sistema',
    ehPublica: false
  },
  {
    codigo: 'usuario:alterar',
    metodo: 'PUT',
    modulo: 'rbac',
		rota: 'usuario/:id',
    functionExec: usuarioController.alterar,
    recurso: 'Usuários',
    descricao: 'Alterar informações de usuários do sistema',
    ehPublica: false
  },
  {
    codigo: 'usuario:cadastrar',
    metodo: 'POST',
    modulo: 'rbac',
		rota: 'usuario',
    functionExec: usuarioController.cadastrar,
    recurso: 'Usuários',
    descricao: 'Cadastrar novos usuários no sistema',
    ehPublica: false
  }
];
