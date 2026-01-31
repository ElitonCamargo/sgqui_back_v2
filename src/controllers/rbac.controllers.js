import * as responses from '../utils/responses.js';
import * as Rbac from '../models/RbacModel.js';
import * as RbacService from '../services/rbacService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listarPerfis = async (req, res) => {
  try {
    const data = await Rbac.listarPerfis();
    return responses.success(res, { message: 'Perfis consultados com sucesso', data });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const listarPerfisDoUsuario = asyncHandler(async (req, res, next) => { 
  const data = await RbacService.listarPerfisDoUsuario(req.params.id);
  return responses.success(res, {
    message: 'Perfis do usuário consultados com sucesso',
    data
  });
});

export const listarPerfilLogado = asyncHandler(async (req, res, next) => { 
  const data = await RbacService.listarPerfisDoUsuario(req.loginId);
  return responses.success(res, {
    message: 'Perfis do usuário consultados com sucesso', 
    data
  });
});

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

export const criarPerfil = async (req, res) => {
  try {
    const nome = String(req.body?.nome ?? '').trim();
    const descricao = req.body?.descricao ?? null;

    if (!nome) {
      return responses.badRequest(res, { message: 'nome é obrigatório' });
    }

    const perfilId = await Rbac.criarPerfil({ nome, descricao });
    return responses.success(res, { message: 'Perfil criado com sucesso', data: { id: perfilId, nome, descricao } });
  } catch (error) {
    let message = error.message;
    if(error.code === 'ER_DUP_ENTRY')
      message = `Nome do perfil já existe: ${req.body?.nome}`;  
    return responses.error(res, { message });
  }
};

export const atualizarPerfil = async (req, res) => {
  try {
    const perfilId = Number(req.params.perfilId);
    const nome = String(req.body?.nome ?? '').trim();
    const descricao = req.body?.descricao ?? null;

    if (!perfilId) {
      return responses.badRequest(res, { message: 'perfilId inválido' });
    }
    if (!nome) {
      return responses.badRequest(res, { message: 'nome é obrigatório' });
    }

    const alterou = await Rbac.atualizarPerfil(perfilId, { nome, descricao });

    if(!alterou){
        return responses.notFound(res, { message: 'Perfil não encontrado' });
    }

    return responses.success(res, { message: 'Perfil atualizado com sucesso' ,  data: alterou});
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const removerPerfil = async (req, res) => {
  try {
    const perfilId = Number(req.params.perfilId);
    if (!perfilId) {
      return responses.badRequest(res, { message: 'perfilId inválido' });
    }

    const removeu = await Rbac.removerPerfil(perfilId);
    if(!removeu){
        return responses.notFound(res, { message: 'Perfil não encontrado' });
    }
    
    return responses.success(res, { message: 'Perfil removido com sucesso', data: { id: perfilId }});
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const listarPermissoes = async (req, res) => {
  try {    
    const data = await RbacService.listarPermissoes();
    return responses.success(res, { message: 'Permissões consultadas com sucesso', data });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const listarRecursos = async (req, res) => {
  try {
    const data = await Rbac.listarRecursos();
    return responses.success(res, { message: 'Recursos consultados com sucesso', data });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const listarPermissoesDoPerfil = asyncHandler(async (req, res, next) => {
    
    const data = await RbacService.listarPermissoesDoPerfil(req.params.perfilId);
    return responses.success(res, { message: 'Permissões do perfil consultadas com sucesso', data });

});

export const vincularPermissoesAoPerfil = async (req, res) => {
  try {
    const perfilId = Number(req.params.perfilId);
    const singleId = req.body?.permissaoEndpointId ?? req.body?.permissao_endpoint_id;
    const ids = req.body?.ids;

    if (!perfilId) {
      return responses.badRequest(res, { message: 'perfilId inválido' });
    }

    let permissaoIds = [];
    if (Array.isArray(ids)) {
      permissaoIds = ids.map((v) => Number(v)).filter(Boolean);
    } else if (singleId !== undefined && singleId !== null) {
      const parsed = Number(singleId);
      if (parsed) permissaoIds = [parsed];
    }

    if (permissaoIds.length === 0) {
      return responses.badRequest(res, { message: 'Informe permissaoEndpointId ou ids' });
    }

    const result = await Rbac.vincularPermissoesAoPerfil(perfilId, permissaoIds);
    return responses.success(res, {
      message: 'Permissões vinculadas com sucesso',
      data: { perfilId, permissaoEndpointIds: permissaoIds, ...result }
    });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const desvincularPermissaoDoPerfil = async (req, res) => {
  try {
    const perfilId = Number(req.params.perfilId);
    const permissaoEndpointId = Number(req.params.permissaoEndpointId);

    if (!perfilId || !permissaoEndpointId) {
      return responses.badRequest(res, { message: 'perfilId e permissaoEndpointId são obrigatórios' });
    }

    const alterou = await Rbac.desvincularPermissaoDoPerfil(perfilId, permissaoEndpointId);
    return responses.success(res, {
      message: alterou ? 'Permissão desvinculada com sucesso' : 'Vínculo não existia',
      data: { perfilId, permissaoEndpointId }
    });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};
