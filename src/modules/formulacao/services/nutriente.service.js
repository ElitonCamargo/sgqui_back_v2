import * as NutrienteModel from '../models/Nutriente.model.js';

export const cadastrar = async (nutriente={}) => {
    return await NutrienteModel.cadastrar(nutriente);
};

export const alterar = async (id, nutriente={}) => {
    return await NutrienteModel.alterar(id, nutriente);
};

export const consultar = async (filtro = '') => {
    return await NutrienteModel.consultar(filtro);
};

export const consultarPorId = async (id) => {
    return await NutrienteModel.consultarPorId(id);
};

export const consultarPorNome = async (nome) => {
    return await NutrienteModel.consultarPorNome(nome);
};

export const consultarPorFormula = async (formula) => {
    return await NutrienteModel.consultarPorFormula(formula);
};

export const deletar = async (id) => {
    return await NutrienteModel.deletar(id);
};
