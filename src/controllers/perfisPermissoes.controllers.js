import * as perfisPermissoes from "../services/perfisPermissoesService.js";
import * as responses from '../utils/responses.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Vincular permissões a um perfil


export const vincular = asyncHandler(async (req, res, next) => {
    const { perfilId, permissoesIds } = req.body;
    const data = await perfisPermissoes.vincular(perfilId, permissoesIds);
    responses.success(res, {
        message: 'Permissões vinculadas ao perfil com sucesso',
        data
    } );
});

export const desvincular = asyncHandler(async (req, res, next) => {
    const vinculo_id = req.params.vinculoID;
    const resultado = await perfisPermissoes.desvincular(vinculo_id);
    responses.success(res, {
        message: 'Permissão desvinculada do perfil com sucesso',
        data: resultado
    } );
});

export const listarVinculos = asyncHandler(async (req, res, next) => {
    const perfilId = req.params.perfilId;
    const data = await perfisPermissoes.listarPermissoesPorPerfil(perfilId);
    responses.success(res, {
        message: 'Permissões listadas com sucesso',
        data
    } );
});