import e from 'express';
import * as PermissoesModel from '../models/PermissoesModel.js';

export const listarTodas = async () => {
    const permissoes = await PermissoesModel.listar();
    
    const agrupado = permissoes.reduce((acc, perm) => {
    const recurso = perm.recurso;

    if (!acc[recurso]) {
        acc[recurso] = {
        recurso,
        permissoes: []
        };
    }

    acc[recurso].permissoes.push({
        id: perm.id,
        codigo: perm.codigo,
        metodo: perm.metodo,
        rota_template: perm.rota_template,
        descricao: perm.descricao,
        eh_publica: (perm.eh_publica == 1)
    });

    return acc;
    }, {});
    return Object.values(agrupado);
}

export const listarPermissoesPorUsuario = async (usuarioId) => {
    const usuarioIdNumber = Number(usuarioId);
    if (!usuarioIdNumber) {
        throw new AppError('usuarioId inválido', 400);
    }
    const permissoesUsuario = await PermissoesModel.listarPermissoesPorUsuario(usuarioIdNumber);
    const todasPermissoes = await PermissoesModel.listar();

    let permissoes = { }
    todasPermissoes.forEach(perm => {
        const possuiPermissao = permissoesUsuario.some(userPerm => userPerm.id === perm.id);
        if (possuiPermissao) {
            permissoes[perm.codigo] = true;
        } else {
            permissoes[perm.codigo] = false;
        }
    });    
    return permissoes;
};

export const listarPermissoesPorUsuarioDetalhada = async (usuarioId) => {
    const usuarioIdNumber = Number(usuarioId);
    if (!usuarioIdNumber) {
        throw new AppError('usuarioId inválido', 400);
    }
    const permissoesUsuario = await PermissoesModel.listarPermissoesPorUsuario(usuarioIdNumber);
    const todasPermissoes = await PermissoesModel.listar();

    let permissoes = []
    todasPermissoes.forEach(perm => {
        const possuiPermissao = permissoesUsuario.some(userPerm => userPerm.id === perm.id);
        if (possuiPermissao) {
            permissoes.push({ "id": perm.id, "codigo": perm.codigo, "recurso": perm.recurso, "concedida": true, "metodo": perm.metodo, "rota_template": perm.rota_template, "descricao": perm.descricao, "eh_publica": (perm.eh_publica == 1)});
        } else {
             permissoes.push({"id": perm.id, "codigo": perm.codigo, "recurso": perm.recurso, "concedida": false, "metodo": perm.metodo, "rota_template": perm.rota_template, "descricao": perm.descricao, "eh_publica": (perm.eh_publica == 1)});
        }
    });    
    return permissoes;
};


export const listarPermissoesChavePorUsuario = async (usuarioId) => {
    const usuarioIdNumber = Number(usuarioId);
    if (!usuarioIdNumber) {
        throw new AppError('usuarioId inválido', 400);
    }
    const permissoes = await PermissoesModel.listarPermissoesPorUsuario(usuarioIdNumber);
    const result = permissoes.map((r) => `${String(r.metodo).toUpperCase()} ${r.rota_template}`);
    return result;
};