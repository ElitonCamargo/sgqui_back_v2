import * as NutrienteModel from '../models/Nutriente.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async ({ nome='', formula='', visivel=1 }) => {
    if (nome.trim() === '') {
        throw new AppError({
            message: 'Nome do nutriente é obrigatório',
            reason: "O campo 'nome' é obrigatório e não pode estar vazio; por favor, forneça um nome para o nutriente",
            code: 400
        });
    }
    if (formula.trim() === '') {
        throw new AppError({
            message: 'Fórmula do nutriente é obrigatória',
            reason: "O campo 'formula' é obrigatório e não pode estar vazio; por favor, forneça uma fórmula para o nutriente",
            code: 400
        });
    }
    if (visivel === undefined) {
        visivel = 1;
    }

    return await NutrienteModel.cadastrar({ nome, formula, visivel });
};

export const alterar = async (id, nutriente={}) => {
    if (id == null || id.trim() === '') {
        throw new AppError({
            message: 'ID do nutriente é obrigatório',
            reason: "O parâmetro 'id' não foi fornecido ou está vazio; é necessário identificar o nutriente a ser alterado",
            code: 400
        });
    }
    if (Object.keys(nutriente).length === 0) {
        throw new AppError({
            message: 'Nenhum dado para alterar',
            reason: "O corpo da requisição está vazio; é necessário enviar ao menos um campo para que a alteração seja realizada",
            code: 400
        });
    }
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
    if (id == null || id.trim() === '') {
        throw new AppError({
            message: 'ID do nutriente é obrigatório',
            reason: "O parâmetro 'id' não foi fornecido ou está vazio; é necessário identificar o nutriente a ser deletado",
            code: 400
        });
    }
    return await NutrienteModel.deletar(id);
};
