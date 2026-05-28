import * as ElementoModel from './elemento.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const consultar = async (query={}) => {
    const data = await ElementoModel.consultar(query);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Nenhum elemento encontrado',
            message: 'Nenhum elemento foi encontrado para os critérios de consulta fornecidos.',
            code: 404
        });
    }
    return data;
};

export const consultarPorId = async (id) => {
    const data = await ElementoModel.consultarPorId(id);
    if (!data) {
        throw new AppError({
            title: 'Elemento não encontrado',
            message: 'O elemento com o ID especificado não foi encontrado. Verifique o ID e tente novamente.',
            code: 404
        });
    }
    return data;
};

export const consultarPorSimbolo = async (simbolo) => {
    const data = await ElementoModel.consultarPorSimbolo(simbolo);
    if (!data) {
        throw new AppError({
            title: 'Elemento não encontrado',
            message: 'O elemento com o símbolo especificado não foi encontrado. Verifique o símbolo e tente novamente.',
            code: 404
        });
    }
    return data;
};
