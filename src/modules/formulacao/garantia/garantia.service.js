import * as GarantiaModel from './garantia.model.js';

export const consultarPorNutriente = async (nutrienteId) => {
    return await GarantiaModel.consultarPorNutriente(nutrienteId);
};

export const consultarPorMateria_prima = async (materia_primaId) => {
    return await GarantiaModel.consultarPorMateria_prima(materia_primaId);
};

export const cadastrar = async (garantia={}) => {
    return await GarantiaModel.cadastrar(garantia);
};

export const alterar = async (garantia={}) => {
    return await GarantiaModel.alterar(garantia);
};

export const consultar = async (filtro = '') => {
    return await GarantiaModel.consultar(filtro);
};

export const consultarPorId = async (id) => {
    return await GarantiaModel.consultarPorId(id);
};

export const consultarPorMP = async (mp_id) => {
    return await GarantiaModel.consultarPorMP(mp_id);
};

export const deletar = async (id) => {
    return await GarantiaModel.deletar(id);
};
