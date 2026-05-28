import * as EtapaMPModel from './etapa_mp.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (etapa_mp={}) => {
    const data = await EtapaMPModel.cadastrar(etapa_mp);
    if (!data) {
        throw new AppError({
            title: 'Erro ao cadastrar etapa de matéria-prima',
            message: 'Não foi possível cadastrar a etapa de matéria-prima. Verifique os dados enviados e tente novamente.',
            code: 500
        });
    }
    return data;
};

export const alterar = async (id=0, etapa_mp={}) => {
    const data = await EtapaMPModel.alterar(id, etapa_mp);
    if (!data) {
        throw new AppError({
            title: 'Etapa de matéria-prima não encontrada',
            message: 'A etapa de matéria-prima não foi encontrada ou não pôde ser atualizada. Verifique o ID informado.',
            code: 404
        });
    }
    return data;
};

export const alterarOrdem = async (ordemEtapaMP=[]) => {
    const data = await EtapaMPModel.alterarOrdem(ordemEtapaMP);
    if (data.length === 0) {
        throw new AppError({
            title: 'Etapa de matéria-prima não encontrada',
            message: 'Nenhuma etapa de matéria-prima foi atualizada na reordenação. Verifique os IDs fornecidos.',
            code: 404
        });
    }
    return data;
};

export const consultar = async (filtro = '') => {
    const data = await EtapaMPModel.consultar(filtro);
    if(data.length === 0) {
        throw new AppError({
            title: 'Nenhuma etapa de matéria-prima encontrada',
            message: 'Nenhuma etapa de matéria-prima corresponde ao filtro informado.',
            code: 404
        });
    }
    return data;
};

export const consultarPorId = async (id) => {
    const data = await EtapaMPModel.consultarPorId(id);
    if (!data) {
        throw new AppError({
            title: 'Etapa de matéria-prima não encontrada',
            message: 'A etapa de matéria-prima com o ID informado não foi encontrada.',
            code: 404
        });
    }
    return data;
};

export const consultarPorEtapa = async (etapa_id) => {
    const data = await EtapaMPModel.consultarPorEtapa(etapa_id);
    if (data.length === 0) {
        throw new AppError({
            title: 'Nenhuma etapa de matéria-prima encontrada',
            message: 'Nenhuma etapa de matéria-prima foi encontrada para a etapa informada.',
            code: 404
        });
    }
    return data;
};

export const deletar = async (id) => {
    const data = await EtapaMPModel.deletar(id);
    if (!data) {
        throw new AppError({
            title: 'Etapa de matéria-prima não encontrada',
            message: 'A etapa de matéria-prima não foi encontrada ou não pôde ser excluída. Verifique o ID informado.',
            code: 404
        });
    }
    return data;
};
