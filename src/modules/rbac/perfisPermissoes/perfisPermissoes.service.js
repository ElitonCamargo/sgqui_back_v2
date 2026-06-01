import { AppError } from "../../../core/utils/AppError.js";
import * as perfisPermissoes from "./perfisPermissoes.model.js";
import * as PermissoesModel from "../permissoes/permissoes.model.js";

// Vincular uma lista de permissões a um perfil
export const vincular = async (perfilId, permissoesIds = []) => {
  const perfilIdNum = Number(perfilId);
  const permissoesIdsNum = permissoesIds.map(id => Number(id));

  if (!perfilIdNum || !Array.isArray(permissoesIds) || permissoesIds.length === 0) {
    throw new AppError({ title: 'Erro ao vincular permissões ao perfil', message: 'Informe um perfil e ao menos uma permissão para realizar o vínculo.', details: `Perfil recebido: ${perfilId}; permissões recebidas: ${JSON.stringify(permissoesIds)}.`, code: 400 });
  }

  const vinculadas = await perfisPermissoes.vincular(perfilIdNum, permissoesIdsNum);
  if (vinculadas === 0) {
    throw new AppError({ title: 'Erro ao vincular permissões ao perfil', message: 'Não foi possível vincular as permissões informadas ao perfil.', details: `Nenhuma permissão vinculada ao perfil ${perfilIdNum} para os IDs ${permissoesIdsNum.join(', ')}.`, code: 409 });
  }

  return { vinculadas };

};



// Listar as permissões vinculadas aos perfis
export const listarVinculos = async (perfilId=undefined) => {
  const perfilIdNum = Number(perfilId);

  if (perfilId !== undefined && isNaN(perfilIdNum)) {
    throw new AppError({ title: 'Erro ao listar permissões do perfil', message: 'Informe um identificador válido para o perfil.', details: `Valor recebido para o ID do perfil: ${perfilId}.`, code: 400 });
  }

  const permissoesJaVinculadas = await perfisPermissoes.listarVinculos(perfilIdNum);
  const permissoesPrivadas = await PermissoesModel.listar("0"); //0 => apenas as permissões privadas


  let permissoes = [];
    
  permissoesPrivadas.forEach(perm => {
        const vinculada = permissoesJaVinculadas.some(userPerm => userPerm.id === perm.id);
        vinculada ? perm.vinculada = true : perm.vinculada = false;
        permissoes.push(perm);
    });

    const resultado = [];

  let moduloAtual = null;
  let recursoAtual = null;

  for (const perm of permissoes) {
    const {
      id,
      codigo,
      modulo,
      recurso,
      metodo,
      rota_template,
      descricao,
      vinculada,
      eh_publica
    } = perm;

    if (!moduloAtual || moduloAtual.modulo !== modulo) {
      moduloAtual = {
        modulo,
        recursos: []
      };

      resultado.push(moduloAtual);
      recursoAtual = null;
    }

    if (!recursoAtual || recursoAtual.recurso !== recurso) {
      recursoAtual = {
        recurso,
        permissoes: []
      };

      moduloAtual.recursos.push(recursoAtual);
    }

    recursoAtual.permissoes.push({
      id,
      codigo,
      metodo,
      rota_template,
      descricao,
      eh_publica: eh_publica === 1,
      vinculada
    });
  }

  return resultado;
  
};

export const permissoesPerfilAcessos = async (perfilId) => {
    const perfilIdNumber = Number(perfilId);
    if (!perfilIdNumber) {
    throw new AppError({ title: 'Erro ao listar acessos do perfil', message: 'Informe um identificador válido para o perfil.', details: `Valor recebido para o ID do perfil: ${perfilId}.`, code: 400 });
    }
    const permissoesPerfil = await perfisPermissoes.permissoesPerfilAcessos(perfilIdNumber);
    const todasPermissoes = await PermissoesModel.listar();

    let permissoes = [];
    todasPermissoes.forEach(perm => {
        const possuiPermissao = permissoesPerfil.some(userPerm => userPerm.id === perm.id);
        possuiPermissao ? perm.concedida = true : perm.concedida = false;
        permissoes.push(perm);
    });    
     
   const resultado = {};

    for (const perm of permissoes) {
      const { codigo, modulo, concedida } = perm;
      if (!resultado[modulo]) resultado[modulo] = {};
      resultado[modulo][codigo] = concedida;
    }

    return resultado;
};
