import * as EtapaMPModel from './etapa_mp.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (etapa_mp={}) => {
    const data = await EtapaMPModel.cadastrar(etapa_mp);
    if (!data) {
        throw new AppError({
            message: 'Erro ao cadastrar etapa de matéria-prima',
            reason: 'O cadastro da etapa de matéria-prima falhou sem um motivo específico. Verifique os dados enviados e tente novamente.',
            code: 500
        });
    }
    return data;
};

export const alterar = async (id=0, etapa_mp={}) => {
    const data = await EtapaMPModel.alterar(id, etapa_mp);
    if (!data) {
        throw new AppError({
            message: 'Erro ao alterar etapa de matéria-prima',
            reason: 'A etapa de matéria-prima não foi encontrada ou não pôde ser atualizada.',
            code: 404
        });
    }
    return data;
};

export const alterarOrdem = async (ordemEtapaMP=[]) => {
    const data = await EtapaMPModel.alterarOrdem(ordemEtapaMP);
    if (data.length === 0) {
        throw new AppError({
            message: 'Erro ao alterar etapa de matéria-prima',
            reason: 'A etapa de matéria-prima não foi encontrada ou não pôde ser atualizada.',
            code: 404
        });
    }
    return data;
};

export const consultar = async (filtro = '') => {
    const data = await EtapaMPModel.consultar(filtro);
    if(data.length === 0) {
        throw new AppError({
            message: 'Nenhuma etapa de matéria-prima encontrada',
            reason: 'Não foram encontradas etapas de matéria-prima que correspondam ao filtro fornecido.',
            code: 404
        });
    }
    return data;
};

export const consultarPorId = async (id) => {
    const data = await EtapaMPModel.consultarPorId(id);
    if (!data) {
        throw new AppError({
            message: 'Etapa de matéria-prima não encontrada',
            reason: 'A etapa de matéria-prima não foi encontrada ou não pôde ser consultada.',
            code: 404
        });
    }
    return data;
};

export const consultarPorEtapa = async (etapa_id) => {
    const data = await EtapaMPModel.consultarPorEtapa(etapa_id);
    if (data.length === 0) {
        throw new AppError({
            message: 'Nenhuma etapa de matéria-prima encontrada',
            reason: 'Não foram encontradas etapas de matéria-prima para a etapa informada.',
            code: 404
        });
    }
    return data;
};

export const deletar = async (id) => {
    const data = await EtapaMPModel.deletar(id);
    if (!data) {
        throw new AppError({
            message: 'Erro ao deletar etapa de matéria-prima',
            reason: 'A etapa de matéria-prima não foi encontrada ou não pôde ser excluída.',
            code: 404
        });
    }
    return data;
};
