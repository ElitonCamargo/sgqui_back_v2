import * as EtapaModel from './etapa.model.js';
import { AppError } from '../../../core/utils/AppError.js'; 

export const cadastrar = async (etapa={}) => {
    return await EtapaModel.cadastrar(etapa);
};

export const alterar = async (etapa={}) => {
    return await EtapaModel.alterar(etapa);
};

export const consultar = async (filtro = '') => {
    return await EtapaModel.consultar(filtro);
};

export const consultarPorId = async (id) => {
    return await EtapaModel.consultarPorId(id);
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
    return await EtapaModel.deletar(id);
};
