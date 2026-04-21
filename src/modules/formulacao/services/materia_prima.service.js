import * as MateriaPrimaModel from '../models/MateriaPrima.model.js';

export const consultar = async (filtro = '') => {
    return await MateriaPrimaModel.consultar(filtro);
};

export const consultarPorId = async (id) => {
    return await MateriaPrimaModel.consultarPorId(id);
};

export const consultarPorCodigo = async (codigo) => {
    return await MateriaPrimaModel.consultarPorCodigo(codigo);
};

export const consultarPorCas_number = async (cas_number) => {
    return await MateriaPrimaModel.consultarPorCas_number(cas_number);
};

export const consultarPorFormula = async (formula) => {
    return await MateriaPrimaModel.consultarPorFormula(formula);
};

export const consultarMP_precentual_nutriente = async (nutrienteID=0,percentual=0.0) => {
    return await MateriaPrimaModel.consultarMP_precentual_nutriente(nutrienteID, percentual);
};

export const cadastrar = async (materia_prima) => {
    return await MateriaPrimaModel.cadastrar(materia_prima);
};

export const alterar = async (materia_prima) => {
    return await MateriaPrimaModel.alterar(materia_prima);
};

export const deletar = async (id) => {
    return await MateriaPrimaModel.deletar(id);
};
