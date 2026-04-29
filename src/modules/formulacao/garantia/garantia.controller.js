import * as Garantia from './garantia.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const consultarPorNutriente = asyncHandler(async (req, res, next) => {
    const nutrienteId = req.params.nutrienteId;
    const data = await Garantia.consultarPorNutriente(nutrienteId);
    return responses.success(res, { data });
});

export const consultarPorMateria_prima = asyncHandler(async (req, res, next) => {
    const materia_primaId = req.params.materia_primaId;
    const data = await Garantia.consultarPorMateria_prima(materia_primaId);
    return responses.success(res, { data });
});

export const cadastrar = asyncHandler(async (req, res, next) => {
    const garantia = req.body;
    const data = await Garantia.cadastrar(garantia);
    return responses.created(res, { data });
});

export const atualizar = asyncHandler(async (req, res, next) => {
    let garantia = req.body;
    garantia.id = req.params.id;
    const data = await Garantia.atualizar(garantia);
    return responses.success(res, { data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = await Garantia.deletar(id);
    return responses.success(res, { data });
});
