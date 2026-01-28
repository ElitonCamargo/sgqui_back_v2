import * as Garantia from '../models/Garantia.js';
import * as responses from '../utils/responses.js';

export const consultarPorNutriente = async (req, res) => {
    try {
        const nutrienteId = req.params.nutrienteId;
        const data = await Garantia.consultarPorNutriente(nutrienteId);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
};

export const consultarPorMateria_prima = async (req, res) => {
    try {
        const materia_primaId = req.params.materia_primaId;
        const data = await Garantia.consultarPorMateria_prima(materia_primaId);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
};

export const cadastrar = async (req, res) => {
    try {
        const garantia = req.body;
        const data = await Garantia.cadastrar(garantia);
        return responses.created(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
};

export const atualizar = async (req, res) => {
    try {
        let garantia = req.body;
        garantia.id = req.params.id;
        const data = await Garantia.atualizar(garantia);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
};

export const deletar = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Garantia.deletar(id);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
};
