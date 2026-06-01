import * as ElementoModel from './elemento.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const consultar = async (query={}) => {
    const data = await ElementoModel.consultar(query);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Erro ao buscar elementos',
            message: 'Nenhum elemento foi encontrado para os filtros informados.',
            details: `Consulta de elementos sem resultado para filtros: ${JSON.stringify(query)}`,
            code: 404
        });
    }
    return data;
};

export const consultarPorId = async (id) => {
    const data = await ElementoModel.consultarPorId(id);
    if (!data) {
        throw new AppError({
            title: 'Erro ao buscar elemento',
            message: 'O elemento informado não foi encontrado.',
            details: `Nenhum elemento encontrado para o ID ${id}.`,
            code: 404
        });
    }
    return data;
};

export const consultarPorSimbolo = async (simbolo) => {
    const data = await ElementoModel.consultarPorSimbolo(simbolo);
    if (!data) {
        throw new AppError({
            title: 'Erro ao buscar elemento',
            message: 'O elemento informado não foi encontrado.',
            details: `Nenhum elemento encontrado para o símbolo ${simbolo}.`,
            code: 404
        });
    }
    return data;
};
