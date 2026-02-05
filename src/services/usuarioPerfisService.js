import * as UsuarioPerfisModel from '../models/UsuarioPerfisModel.js';
import { AppError } from '../utils/AppError.js';

// Vincular um perfil com permissoões de acesso ja definidas a um usuario
export const vincular = async (usuarioId, perfilId) => {
  const usuarioIdNum = Number(usuarioId);
  const perfilIdNum = Number(perfilId);
  if (!usuarioIdNum || !perfilIdNum) {
    throw new AppError('usuarioId ou perfilId inválido', 400);
  }
  const vinculou = await UsuarioPerfisModel.vincular(usuarioIdNum, perfilIdNum);
  if (!vinculou) {
    throw new AppError('Perfil já está vinculado ao usuário', 409);
  }
  return vinculou;
};

// Desvincular um perfil de um usuário
export const desvincular = async (vinculoID) => {
  const vinculoIdNum = Number(vinculoID);
  if (!vinculoIdNum) {
    throw new AppError('vinculoID inválido', 400);
  }
  const desvinculou = await UsuarioPerfisModel.desvincular(vinculoIdNum);
  if (!desvinculou) {
    throw new AppError('Vínculo não encontrado', 404);
  }
  return desvinculou;
};

// Listar todos os perfis e quais usuários estão vinculados a eles
export const listar = async () => {
  const dados = await UsuarioPerfisModel.listar();
  if (!dados || dados.length === 0) {
    throw new AppError('Nenhum perfil vinculado a usuários encontrado', 404);
  }
  const resultado = dados.reduce((acc, item) => {
    const perfilId = item.perfil_id;
    if (!acc[perfilId]) {
      acc[perfilId] = {
        perfil: {
          id: item.perfil_id,
          nome: item.perfil_nome,
          descricao: item.perfil_descricao
        },
        usuarios: []
      };
    }
    acc[perfilId].usuarios.push({
      vinculoId: item.vinculo_id,
      usuarioId: item.usuario_id,
      nome: item.usuario_nome,
      email: item.usuario_email,
      avatar: item.usuario_avatar,
      status: item.usuario_status
    });
    return acc;
  }, {});

  return Object.values(resultado);
};

// Listar os perfis vinculados a um usuário específico
export const listarPerfisPorUsuario = async (usuarioId) => {
  const usuarioIdNum = Number(usuarioId);
  if (!usuarioIdNum) {
    throw new AppError('usuarioId inválido', 400);
  }
  const dados = await UsuarioPerfisModel.listarPerfisPorUsuario(usuarioIdNum);
  // if (!dados || dados.length === 0) {
  //   throw new AppError('Nenhum perfil vinculado ao usuário', 404);
  // }
  return dados;
};

export const listarNomesPerfisDoUsuario = async (usuarioId) => {
    const usuarioIdNumber = Number(usuarioId);
    if (!usuarioIdNumber) {
        throw new AppError('usuarioId inválido', 400);
    }
    const perfis = await UsuarioPerfisModel.listarPerfisPorUsuario(usuarioIdNumber);
    return perfis.map((r) => r.nome);
};

// Listar os usuários vinculados a um perfil específico
export const listarUsuariosPorPerfil = async (perfilId) => {
  const perfilIdNum = Number(perfilId);
  if (!perfilIdNum) {
    throw new AppError('perfilId inválido', 400);
  }
  const dados = await UsuarioPerfisModel.listarUsuariosPorPerfil(perfilIdNum);
  if (!dados || dados.length === 0) {
    throw new AppError('Nenhum usuário vinculado ao perfil', 404);
  }
  return dados;
};


