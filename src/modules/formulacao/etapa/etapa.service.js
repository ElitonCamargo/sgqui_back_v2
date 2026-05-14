import * as EtapaModel from './etapa.model.js';
import { AppError } from '../../../core/utils/AppError.js'; 

export const cadastrar = async (etapa={}) => {
    const novoEtapa = await EtapaModel.cadastrar(etapa);
    if(!novoEtapa) {
        throw new AppError({
            message: 'Falha ao cadastrar etapa',
            reason: 'Ocorreu um erro ao tentar cadastrar a etapa. Verifique se os dados fornecidos são válidos e se o projeto associado existe.',
            code: 500
        });
    }
    return novoEtapa;
};

export const alterar = async (id=0, etapa={}) => {
    const result = await EtapaModel.alterar(id, etapa);
    if(!result) {
        throw new AppError({
            message: 'Falha ao alterar etapa',
            reason: 'Verifique se a etapa fornecida é válida e se os dados para alteração estão corretos.',
            code: 404
        });
    }
    return result;
};

export const alterarOrdem = async (ordemEtapa = []) => {
    const result = await EtapaModel.alterarOrdem(ordemEtapa);
    if(!result) {
        throw new AppError({
            message: 'Falha ao alterar ordem das etapas',
            reason: 'Verifique se as etapas fornecidas são válidas e se os dados para alteração estão corretos.',
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
            message: 'Etapa não encontrada',
            reason: `A etapa com ID ${id} não foi encontrada.`,
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
            message: 'Nenhuma etapa encontrada para este projeto',
            reason: `Não foram encontradas etapas associadas ao projeto com ID ${projeto_id}. Verifique se o projeto existe e se possui etapas cadastradas.`,
            code: 404
        });
    }
    return data;
};

export const deletar = async (id) => {
    const result = await EtapaModel.deletar(id);
    if(!result) {
        throw new AppError({
            message: 'Etapa não encontrada para exclusão',
            reason: 'A etapa que você está tentando excluir não existe ou já foi excluída. Verifique o ID fornecido e tente novamente.',
            code: 404
        });
    }
    return result;
};
