import * as perfisModel from '../models/PerfisModel.js';
import { AppError } from '../utils/AppError.js';

export const cadastrar = async ({ nome, descricao = null }) => {
    if(nome == null || nome.trim() === ''){
        throw new AppError('Nome do perfil é obrigatório', 400);
    }
    return await perfisModel.cadastrar({ nome: nome.trim(), descricao });
};

export const listar = async () => {
    const perfis = await perfisModel.listar();
    if(!perfis || perfis.length === 0){
        throw new AppError('Nenhum perfil encontrado', 404);
    }
    return perfis;
};


export const listarPorId = async (perfilId) => {
    const perfilIdNumber = Number(perfilId);
    if (!perfilIdNumber) {
        throw new AppError('perfilId inválido', 400);
    }
    const perfil = await perfisModel.listarPorId(perfilIdNumber);
    if(!perfil){
        throw new AppError('Perfil não encontrado', 404);
    }
    return perfil;
};

export const listarPorNome = async (perfilNome) => {
    if (!perfilNome || perfilNome.trim() === '') {
        throw new AppError('perfilNome inválido', 400);
    }
    const perfil = await perfisModel.listarPorNome(perfilNome.trim());
    if(!perfil){
        throw new AppError('Perfil não encontrado', 404);
    }
    return perfil;
};

export const alterar = async (perfilId, dados = { nome:'', descricao:''}) => {
    const perfilIdNumber = Number(perfilId);
    const nome = dados.nome.trim() ?? undefined;
    const descricao = dados.descricao.trim() ?? undefined; 

    if (!perfilIdNumber) {
        throw new AppError('perfilId inválido', 400);
    }
    
    const atualizado = await perfisModel.alterar(perfilIdNumber, { nome, descricao });
    if(!atualizado){
        throw new AppError('Perfil não encontrado', 404);
    }
    return atualizado;
};

export const remover = async (perfilId) => {
    const perfilIdNumber = Number(perfilId); 
    if (!perfilIdNumber) {
        throw new AppError('perfilId inválido', 400);
    }
    const removido = await perfisModel.remover(perfilIdNumber);
    if(!removido){
        throw new AppError('Perfil não encontrado', 404);
    }
    return removido;
};
