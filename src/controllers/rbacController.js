import * as responses from '../utils/responses.js';
import * as Rbac from '../models/RbacModel.js';

export const listarPerfis = async (req, res) => {
  try {
    const data = await Rbac.listarPerfis();
    return responses.success(res, { message: 'Perfis consultados com sucesso', data });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const listarPerfisDoUsuario = async (req, res) => {
  try {
    const usuarioId = Number(req.params.id);
    if (!usuarioId) {
      return responses.badRequest(res, { message: 'ID de usuário inválido' });
    }

    const data = await Rbac.listarPerfisDoUsuario(usuarioId);
    return responses.success(res, { message: 'Perfis do usuário consultados com sucesso', data });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const atribuirPerfilAoUsuario = async (req, res) => {
  try {
    const usuarioId = Number(req.params.id);
    const perfilId = Number(req.body?.perfilId ?? req.body?.perfil_id);

    if (!usuarioId || !perfilId) {
      return responses.badRequest(res, { message: 'usuarioId e perfilId são obrigatórios' });
    }

    const alterou = await Rbac.atribuirPerfilAoUsuario(usuarioId, perfilId);
    return responses.success(res, {
      message: alterou ? 'Perfil atribuído com sucesso' : 'Perfil já estava atribuído',
      data: { usuarioId, perfilId }
    });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const removerPerfilDoUsuario = async (req, res) => {
  try {
    const usuarioId = Number(req.params.id);
    const perfilId = Number(req.params.perfilId);

    if (!usuarioId || !perfilId) {
      return responses.badRequest(res, { message: 'usuarioId e perfilId são obrigatórios' });
    }

    const alterou = await Rbac.removerPerfilDoUsuario(usuarioId, perfilId);
    return responses.success(res, {
      message: alterou ? 'Perfil removido com sucesso' : 'Perfil não estava atribuído',
      data: { usuarioId, perfilId }
    });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};
