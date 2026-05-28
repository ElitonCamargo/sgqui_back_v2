import * as GarantiaModel from './garantia.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (garantia={}) => {
    const data = await GarantiaModel.cadastrar(garantia);
    if (!data) {
        throw new AppError({
            title: 'Erro ao cadastrar garantia',
            message: 'Não foi possível cadastrar a garantia. Verifique os dados enviados e tente novamente.',
            code: 400
        });
    }
    return data;
};

export const consultarPorMateria_prima = async (materia_primaId) => {
    if(isNaN(materia_primaId) || materia_primaId <= 0) {
        throw new AppError({
            title: 'ID da matéria-prima inválido',
            message: 'O ID da matéria-prima deve ser um número inteiro positivo.',
            code: 400
        });
    }
    const data = await GarantiaModel.consultarPorMateria_prima(materia_primaId);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Nenhuma garantia encontrada',
            message: 'Nenhuma garantia foi encontrada para a matéria-prima especificada.',
            code: 404
        });
    }
    return data;
};

export const consultarPorNutriente = async (nutrienteId) => {
    if(isNaN(nutrienteId) || nutrienteId <= 0) {
        throw new AppError({
            title: 'ID do nutriente inválido',
            message: 'O ID do nutriente deve ser um número inteiro positivo.',
            code: 400
        });
    }
    const data = await GarantiaModel.consultarPorNutriente(nutrienteId);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Nenhuma garantia encontrada',
            message: 'Nenhuma garantia foi encontrada para o nutriente especificado.',
            code: 404
        });
    }
    return data;
};



export const alterar = async (garantia={}) => {
    if(isNaN(garantia.id) || garantia.id <= 0) {
        throw new AppError({
            title: 'ID da garantia inválido',
            message: 'O ID da garantia deve ser um número inteiro positivo.',
            code: 400
        });
    }
    const data = await GarantiaModel.alterar(garantia);
    if (!data) {
        throw new AppError({
            title: 'Garantia não encontrada',
            message: 'Não foi possível alterar a garantia. Verifique se o ID é válido e se a garantia existe.',
            code: 400
        });
    }
    return data;
};

export const consultar = async (filtro = '') => {
    return await GarantiaModel.consultar(filtro);
};

export const consultarPorId = async (id) => {
    return await GarantiaModel.consultarPorId(id);
};

export const consultarPorMP = async (mp_id) => {
    if(isNaN(mp_id) || mp_id <= 0) {
        throw new AppError({
            title: 'ID da matéria-prima inválido',
            message: 'O ID da matéria-prima deve ser um número inteiro positivo.',
            code: 400
        });
    }
    return await GarantiaModel.consultarPorMP(mp_id);
};

export const deletar = async (id) => {
    if(isNaN(id) || id <= 0) {
        throw new AppError({
            title: 'ID da garantia inválido',
            message: 'O ID da garantia deve ser um número inteiro positivo.',
            code: 400
        });
    }
    const data = await GarantiaModel.deletar(id);
    if (!data) {
        throw new AppError({
            title: 'Garantia não encontrada',
            message: 'Não foi possível excluir a garantia. Verifique se o ID é válido e se a garantia existe.',
            code: 400
        });
    }
    return data;
};
