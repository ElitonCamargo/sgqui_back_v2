import * as EtapaModel from './etapa.model.js';
import { AppError } from '../../../core/utils/AppError.js'; 

export const cadastrar = async (etapa={}) => {
    const novoEtapa = await EtapaModel.cadastrar(etapa);
    if(!novoEtapa) {
        throw new AppError({
            title: 'Erro ao cadastrar etapa',
            message: 'Não foi possível cadastrar a etapa.',
            details: `O cadastro da etapa não retornou um registro válido para o projeto ${etapa.projeto ?? 'não informado'}.`,
            code: 500
        });
    }
    return novoEtapa;
};

export const alterar = async (id=0, etapa={}) => {
    const result = await EtapaModel.alterar(id, etapa);
    if(!result) {
        throw new AppError({
            title: 'Erro ao atualizar etapa',
            message: 'Não foi possível atualizar a etapa informada.',
            details: `Nenhuma etapa encontrada para atualização com o ID ${id}.`,
            code: 404
        });
    }
    return result;
};

export const alterarOrdem = async (ordemEtapa = []) => {
    const result = await EtapaModel.alterarOrdem(ordemEtapa);
    if(!result) {
        throw new AppError({
            title: 'Erro ao reordenar etapas',
            message: 'Não foi possível alterar a ordem das etapas informadas.',
            details: `Nenhuma etapa foi atualizada na reordenação. IDs recebidos: ${ordemEtapa.map(({ id }) => id).join(', ')}.`,
            code: 404
        });
    }
    return result;
};

export const consultar = async (filtro = '') => {
    return await EtapaModel.consultar(filtro);
};

export const consultarPorId = async (id) => {
    const data = await EtapaModel.consultarPorId(id);
    if(!data) {
        throw new AppError({
            title: 'Erro ao buscar etapa',
            message: 'A etapa informada não foi encontrada.',
            details: `Nenhuma etapa encontrada para o ID ${id}.`,
            code: 404
        });
    }
    return data;
};

export const consultarPorNome = async (nome) => {
    return await EtapaModel.consultarPorNome(nome);
};

export const consultarPorProjeto = async (projeto_id) => {
    const data = await EtapaModel.consultarPorProjeto(projeto_id);
    if(data.length === 0) {
        throw new AppError({
            title: 'Erro ao buscar etapas do projeto',
            message: 'Nenhuma etapa foi encontrada para o projeto informado.',
            details: `Nenhuma etapa encontrada para o projeto ${projeto_id}.`,
            code: 404
        });
    }
    return data;
};

export const deletar = async (id) => {
    const result = await EtapaModel.deletar(id);
    if(!result) {
        throw new AppError({
            title: 'Erro ao excluir etapa',
            message: 'Não foi possível excluir a etapa informada.',
            details: `Nenhuma etapa encontrada para exclusão com o ID ${id}.`,
            code: 404
        });
    }
    return result;
};
