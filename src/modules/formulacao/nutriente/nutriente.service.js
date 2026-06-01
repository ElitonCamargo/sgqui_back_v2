import * as NutrienteModel from './nutriente.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async ({ nome='', formula='', visivel=true }) => {
    const novoNutriente = await NutrienteModel.cadastrar({ nome, formula, visivel });
    if (!novoNutriente) {
        throw new AppError({
            title: 'Erro ao cadastrar nutriente',
            message: 'Não foi possível cadastrar o nutriente.',
            details: `O cadastro do nutriente não retornou um registro válido para nome="${nome}" e formula="${formula}".`,
            code: 500
        });
    }
    novoNutriente.visivel = novoNutriente.visivel == 1; // Converter para booleano
    return novoNutriente;
};

export const alterar = async (id, nutriente={}) => {    
    const result = await NutrienteModel.alterar(id, nutriente);
    if (!result) {
        throw new AppError({
            title: 'Erro ao atualizar nutriente',
            message: 'Não foi possível atualizar o nutriente informado.',
            details: `Nenhum nutriente encontrado para atualização com o ID ${id}.`,
            code: 404
        });
    }
    result.visivel = result.visivel == 1; // Converter para booleano
    return result;
};

export const consultar = async (filtro = '') => {
    return await NutrienteModel.consultar(filtro);
};

export const consultarPorId = async (id) => {
    if (id == null || id.trim() === '') {
        throw new AppError({
            title: 'Erro ao buscar nutriente',
            message: 'Informe um identificador válido para consultar o nutriente.',
            details: `Valor recebido para o ID do nutriente: ${id}`,
            code: 400
        });
    }
    const data = await NutrienteModel.consultarPorId(id);
    if (!data) {
        throw new AppError({
            title: 'Erro ao buscar nutriente',
            message: 'O nutriente informado não foi encontrado.',
            details: `Nenhum nutriente encontrado para o ID ${id}.`,
            code: 404
        });
    }
    return data;
};

export const consultarPorNome = async (nome) => {
    return await NutrienteModel.consultarPorNome(nome);
};

export const consultarPorFormula = async (formula) => {
    return await NutrienteModel.consultarPorFormula(formula);
};

export const deletar = async (id) => {
    const result = await NutrienteModel.deletar(id);
    if (!result) {
        throw new AppError({
            title: 'Erro ao excluir nutriente',
            message: 'Não foi possível excluir o nutriente informado.',
            details: `Nenhum nutriente encontrado para exclusão com o ID ${id}.`,
            code: 404
        });
    }
    return result;
};
