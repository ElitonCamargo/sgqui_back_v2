import * as projetoService from './projeto.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const listarLiberados = asyncHandler(async (req, res, next) => {
    const filtro = req.query;
    const data = await projetoService.listarLiberados(filtro);
    return responses.success(res, { message: 'Projetos encontrados', data });
});


// *************** Consultas Entre vária entidades ***********************

export const visualizarFormulacao = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    const data = await projetoService.visualizarFormulacao(id);
    return responses.success(res, { message: 'Formulação do projeto visualizada com sucesso', data });
});
