import { AppError } from "../utils/AppError.js";
import * as perfisPermissoes from "../models/PerfisPermissoesModel.js";

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

// Desvincular uma permissão de um perfil pelo ID do vínculo
export const desvincular = async (vinculo_id) => {
  const vinculoIdNum = Number(vinculo_id);
  if (!vinculoIdNum) {
    throw new AppError('vinculoID inválido', 400);
  }
  const alterou = await perfisPermissoes.desvincular(vinculoIdNum);
  if (!alterou) {
    throw new AppError('Vínculo não encontrado', 404);
  }
  return alterou;
};

// Listar as permissões vinculadas aos perfis
export const listarPermissoesPorPerfil = async (perfilId=undefined) => {
  const perfilIdNum = perfilId !== undefined ? Number(perfilId) : undefined;

  const dados = await perfisPermissoes.listarPermissoesPorPerfil(perfilIdNum);
  if (!dados || dados.length === 0) {
    throw new AppError('Nenhuma informação sobre permissões vinculadas aos perfis', 404);
  }

  const resultado = dados.reduce((acc, item) => {
    const perfilId = item.perfis_id;
    if (!acc[perfilId]) {
      acc[perfilId] = {
        perfil: {
          id: item.perfis_id,
          nome: item.perfis_nome,
          descricao: item.perfis_descricao
        },
        permissoes: []
      };
    }
    acc[perfilId].permissoes.push({
      id: item.permissoes_id,
      recurso: item.permissoes_recurso,
      metodo: item.permissoes_metodo,
      rota_template: item.permissoes_rota_template,
      descricao: item.permissoes_descricao
    });
    return acc;
  }, {});
  return Object.values(resultado);
};