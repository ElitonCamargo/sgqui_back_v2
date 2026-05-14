import * as ElementoModel from './elemento.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const consultar = async (query={}) => {
    const data = await ElementoModel.consultar(query);
    if (!data || data.length === 0) {
        throw new AppError({
            message: 'Nenhum elemento encontrado',
            reason: 'A consulta não retornou resultados para os critérios fornecidos. Verifique os parâmetros de consulta e tente novamente.',
            code: 404
        });
    }
    return data;
};

export const consultarPorId = async (id) => {
    const data = await ElementoModel.consultarPorId(id);
    if (!data) {
        throw new AppError({
            message: 'Elemento não encontrado',
            reason: 'O elemento com o ID especificado não foi encontrado. Verifique o ID e tente novamente.',
            code: 404
        });
    }
    return data;
};

export const consultarPorSimbolo = async (simbolo) => {
    const data = await ElementoModel.consultarPorSimbolo(simbolo);
    if (!data) {
        throw new AppError({
            message: 'Elemento não encontrado',
            reason: 'O elemento com o símbolo especificado não foi encontrado. Verifique o símbolo e tente novamente.',
            code: 404
        });
    }
    return data;
};
