import { AppError } from "../../../core/utils/AppError.js";
import * as perfisPermissoes from "./perfisPermissoes.model.js";
import * as PermissoesModel from "../permissoes/permissoes.model.js";

// Vincular uma lista de permissões a um perfil
export const vincular = async (perfilId, permissoesIds = []) => {
  const perfilIdNum = Number(perfilId);
  const permissoesIdsNum = permissoesIds.map(id => Number(id));

  if (!perfilIdNum || !Array.isArray(permissoesIds) || permissoesIds.length === 0) {
    throw new AppError('perfilId e permissoesIds são obrigatórios', 400);
  }

  const vinculadas = await perfisPermissoes.vincular(perfilIdNum, permissoesIdsNum);
  if (vinculadas === 0) {
    throw new AppError('Nenhuma permissão foi vinculada ao perfil', 409);
  }

  return { vinculadas };

};



// Listar as permissões vinculadas aos perfis
export const listarVinculos = async (perfilId=undefined) => {
  const perfilIdNum = Number(perfilId);

  if (perfilId !== undefined && isNaN(perfilIdNum)) {
    throw new AppError('perfilId inválido', 400);
  }

  const permissoesJaVinculadas = await perfisPermissoes.listarVinculos(perfilIdNum);
  const permissoesPrivadas = await PermissoesModel.listar("0"); //0 => apenas as permissões privadas
  let dados = [];
  
  
  permissoesPrivadas.forEach(perm => {
        if (permissoesJaVinculadas.some(userPerm => userPerm.id === perm.id)) {
            perm.vinculada = true;
          } else {
            perm.vinculada = false;
          }
          dados.push(perm);
    });

    const resultado = dados.reduce((acc, perm) => {
      const recurso = perm.recurso;
      if (!acc[recurso]) {
        acc[recurso] = {
          recurso: recurso,
          permissoes: []
        };
      }
      acc[recurso].permissoes.push(perm);
      return acc;
    }, {});
  return Object.values(resultado);
  
};

export const permissoesPerfilAcessos = async (perfilId) => {
    const perfilIdNumber = Number(perfilId);
    if (!perfilIdNumber) {
        throw new AppError('perfilId inválido', 400);
    }
    const permissoesPerfil = await perfisPermissoes.permissoesPerfilAcessos(perfilIdNumber);
    const todasPermissoes = await PermissoesModel.listar();

    let permissoes = { }
    todasPermissoes.forEach(perm => {
        const possuiPermissao = permissoesPerfil.some(userPerm => userPerm.id === perm.id);
        if (possuiPermissao) {
            permissoes[perm.codigo] = true;
        } else {
            permissoes[perm.codigo] = false;
        }
    });    
    return permissoes;
};
