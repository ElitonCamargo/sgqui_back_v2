import * as NutrienteModel from './nutriente.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async ({ nome='', formula='', visivel=1 }) => {
    return await NutrienteModel.cadastrar({ nome, formula, visivel });
};

export const alterar = async (id, nutriente={}) => {    
    const result = await NutrienteModel.alterar(id, nutriente);
    if (!result) {
        throw new AppError({
            message: 'Nutriente não encontrado',
            reason: 'O nutriente com o ID especificado não foi encontrado.',
            code: 404
        });
    }
    return result;
};

export const consultar = async (filtro = '') => {
    return await NutrienteModel.consultar(filtro);
};

export const consultarPorId = async (id) => {
    if (id == null || id.trim() === '') {
        throw new AppError({
            message: 'ID do nutriente é obrigatório',
            reason: "O parâmetro 'id' não foi fornecido ou está vazio; é necessário identificar o nutriente",
            code: 400
        });
    }
    return await NutrienteModel.consultarPorId(id);
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
            message: 'Nutriente não encontrado',
            reason: 'O nutriente com o ID especificado não foi encontrado.',
            code: 404
        });
    }
    return result;
};
