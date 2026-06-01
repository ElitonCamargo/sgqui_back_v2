import * as GarantiaModel from './garantia.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (garantia={}) => {
    const data = await GarantiaModel.cadastrar(garantia);
    if (!data) {
        throw new AppError({
            title: 'Erro ao cadastrar garantia',
            message: 'Não foi possível cadastrar a garantia.',
            details: `O cadastro da garantia não retornou registro válido para matéria-prima ${garantia.materia_prima_id ?? 'não informada'} e nutriente ${garantia.nutriente_id ?? 'não informado'}.`,
            code: 400
        });
    }
    return data;
};

export const consultarPorMateria_prima = async (materia_primaId) => {
    if(isNaN(materia_primaId) || materia_primaId <= 0) {
        throw new AppError({
            title: 'Erro ao buscar garantias da matéria-prima',
            message: 'Informe um identificador válido para a matéria-prima.',
            details: `Valor recebido para o ID da matéria-prima: ${materia_primaId}.`,
            code: 400
        });
    }
    const data = await GarantiaModel.consultarPorMateria_prima(materia_primaId);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Erro ao buscar garantias da matéria-prima',
            message: 'Nenhuma garantia foi encontrada para a matéria-prima informada.',
            details: `Nenhuma garantia encontrada para a matéria-prima ${materia_primaId}.`,
            code: 404
        });
    }
    return data;
};

export const consultarPorNutriente = async (nutrienteId) => {
    if(isNaN(nutrienteId) || nutrienteId <= 0) {
        throw new AppError({
            title: 'Erro ao buscar garantias do nutriente',
            message: 'Informe um identificador válido para o nutriente.',
            details: `Valor recebido para o ID do nutriente: ${nutrienteId}.`,
            code: 400
        });
    }
    const data = await GarantiaModel.consultarPorNutriente(nutrienteId);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Erro ao buscar garantias do nutriente',
            message: 'Nenhuma garantia foi encontrada para o nutriente informado.',
            details: `Nenhuma garantia encontrada para o nutriente ${nutrienteId}.`,
            code: 404
        });
    }
    return data;
};



export const alterar = async (garantia={}) => {
    if(isNaN(garantia.id) || garantia.id <= 0) {
        throw new AppError({
            title: 'Erro ao atualizar garantia',
            message: 'Informe um identificador válido para a garantia.',
            details: `Valor recebido para o ID da garantia: ${garantia.id}.`,
            code: 400
        });
    }
    const data = await GarantiaModel.alterar(garantia);
    if (!data) {
        throw new AppError({
            title: 'Erro ao atualizar garantia',
            message: 'Não foi possível atualizar a garantia informada.',
            details: `Nenhuma garantia encontrada para atualização com o ID ${garantia.id}.`,
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
            title: 'Erro ao buscar garantias da matéria-prima',
            message: 'Informe um identificador válido para a matéria-prima.',
            details: `Valor recebido para o ID da matéria-prima: ${mp_id}.`,
            code: 400
        });
    }
    return await GarantiaModel.consultarPorMP(mp_id);
};

export const deletar = async (id) => {
    if(isNaN(id) || id <= 0) {
        throw new AppError({
            title: 'Erro ao excluir garantia',
            message: 'Informe um identificador válido para excluir a garantia.',
            details: `Valor recebido para o ID da garantia: ${id}.`,
            code: 400
        });
    }
    const data = await GarantiaModel.deletar(id);
    if (!data) {
        throw new AppError({
            title: 'Erro ao excluir garantia',
            message: 'Não foi possível excluir a garantia informada.',
            details: `Nenhuma garantia encontrada para exclusão com o ID ${id}.`,
            code: 400
        });
    }
    return data;
};
