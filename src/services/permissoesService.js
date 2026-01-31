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
    const permissoes = await PermissoesModel.listarPermissoesPorUsuario(usuarioId);
    const todasPermissoes = await PermissoesModel.listar();

    // Filtrar as permissões que o usuário possui
    const permissoesDoUsuario = todasPermissoes.filter(perm => 
        permissoes.some(userPerm => userPerm.id === perm.id)
    );
    
    return permissoesDoUsuario;
};


export const listarPermissoesChavePorUsuario = async (usuarioId) => {
    const usuarioIdNumber = Number(usuarioId);
    if (!usuarioIdNumber) {
        throw new AppError('usuarioId inválido', 400);
    }
    const permissoes = await PermissoesModel.listarPermissoesPorUsuario(usuarioId);
    const result = permissoes.map((r) => `${String(r.metodo).toUpperCase()} ${r.rota_template}`);
    return result;
};