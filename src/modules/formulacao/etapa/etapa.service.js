import * as EtapaModel from './etapa.model.js';
import { AppError } from '../../../core/utils/AppError.js'; 

export const cadastrar = async (etapa={}) => {
    const novoEtapa = await EtapaModel.cadastrar(etapa);
    if(!novoEtapa) {
        throw new AppError({
            title: 'Erro ao cadastrar etapa',
            message: 'Não foi possível cadastrar a etapa. Verifique se os dados são válidos e se o projeto associado existe.',
            code: 500
        });
    }
    return novoEtapa;
};

export const alterar = async (id=0, etapa={}) => {
    const result = await EtapaModel.alterar(id, etapa);
    if(!result) {
        throw new AppError({
            title: 'Etapa não encontrada',
            message: 'Não foi possível alterar a etapa. Verifique se o ID é válido e se os dados estão corretos.',
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
            message: 'Não foi possível alterar a ordem das etapas. Verifique se os IDs fornecidos são válidos.',
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
            title: 'Etapa não encontrada',
            message: `A etapa com ID ${id} não foi encontrada.`,
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
            title: 'Nenhuma etapa encontrada',
            message: `Nenhuma etapa foi encontrada associada ao projeto com ID ${projeto_id}. Verifique se o projeto existe e se possui etapas cadastradas.`,
            code: 404
        });
    }
    return data;
};

export const deletar = async (id) => {
    const result = await EtapaModel.deletar(id);
    if(!result) {
        throw new AppError({
            title: 'Etapa não encontrada',
            message: 'A etapa que você está tentando excluir não existe ou já foi excluída. Verifique o ID fornecido.',
            code: 404
        });
    }
    return result;
};
