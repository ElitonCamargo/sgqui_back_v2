import * as perfisModel from './perfis.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async ({ nome, descricao = null }) => {
    if(nome == null || nome.trim() === ''){
        throw new AppError({
            title: 'Erro ao cadastrar perfil',
            message: 'Informe um nome válido para cadastrar o perfil.',
            details: `Valor recebido para o nome do perfil: ${nome}.`,
            code: 400
        });
    }
    return await perfisModel.cadastrar({ nome: nome.trim(), descricao });
};

export const listar = async () => {
    const perfis = await perfisModel.listar();
    if(!perfis || perfis.length === 0){
        throw new AppError({
            title: 'Erro ao listar perfis',
            message: 'Nenhum perfil foi encontrado.',
            details: 'A listagem de perfis não retornou registros ativos.',
            code: 404
        });
    }
    return perfis;
};


export const listarPorId = async (perfilId) => {
    const perfilIdNumber = Number(perfilId);
    if (!perfilIdNumber) {
        throw new AppError({
            title: 'Erro ao buscar perfil',
            message: 'Informe um identificador válido para consultar o perfil.',
            details: `Valor recebido para o ID do perfil: ${perfilId}.`,
            code: 400
        });
    }
    const perfil = await perfisModel.listarPorId(perfilIdNumber);
    if(!perfil){
        throw new AppError({
            title: 'Erro ao buscar perfil',
            message: 'O perfil informado não foi encontrado.',
            details: `Nenhum perfil encontrado para o ID ${perfilIdNumber}.`,
            code: 404
        });
    }
    return perfil;
};

export const listarPorNome = async (perfilNome) => {
    if (!perfilNome || perfilNome.trim() === '') {
        throw new AppError({
            title: 'Erro ao buscar perfil',
            message: 'Informe um nome válido para consultar o perfil.',
            details: `Valor recebido para o nome do perfil: ${perfilNome}.`,
            code: 400
        });
    }
    const perfil = await perfisModel.listarPorNome(perfilNome.trim());
    if(!perfil){
        throw new AppError({
            title: 'Erro ao buscar perfil',
            message: 'O perfil informado não foi encontrado.',
            details: `Nenhum perfil encontrado para o nome ${perfilNome.trim()}.`,
            code: 404
        });
    }
    return perfil;
};

export const alterar = async (perfilId, dados = { nome:'', descricao:''}) => {
    const perfilIdNumber = Number(perfilId);
    const nome = dados.nome.trim() ?? undefined;
    const descricao = dados.descricao.trim() ?? undefined; 

    if (!perfilIdNumber) {
        throw new AppError({
            title: 'Erro ao atualizar perfil',
            message: 'Informe um identificador válido para atualizar o perfil.',
            details: `Valor recebido para o ID do perfil: ${perfilId}.`,
            code: 400
        });
    }
    
    const atualizado = await perfisModel.alterar(perfilIdNumber, { nome, descricao });
    if(!atualizado){
        throw new AppError({
            title: 'Erro ao atualizar perfil',
            message: 'Não foi possível atualizar o perfil informado.',
            details: `Nenhum perfil encontrado para atualização com o ID ${perfilIdNumber}.`,
            code: 404
        });
    }
    return atualizado;
};

export const remover = async (perfilId) => {
    const perfilIdNumber = Number(perfilId); 
    if (!perfilIdNumber) {
        throw new AppError({
            title: 'Erro ao excluir perfil',
            message: 'Informe um identificador válido para excluir o perfil.',
            details: `Valor recebido para o ID do perfil: ${perfilId}.`,
            code: 400
        });
    }
    const removido = await perfisModel.remover(perfilIdNumber);
    if(!removido){
        throw new AppError({
            title: 'Erro ao excluir perfil',
            message: 'Não foi possível excluir o perfil informado.',
            details: `Nenhum perfil encontrado para exclusão com o ID ${perfilIdNumber}.`,
            code: 404
        });
    }
    return removido;
};
