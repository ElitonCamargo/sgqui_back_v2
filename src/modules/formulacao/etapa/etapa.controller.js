import * as Etapa from './etapa.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const cadastrar = asyncHandler(async (req, res, next) => {
    const etapa = req.body;    
    const novoEtapa = await Etapa.cadastrar(etapa);    
    return responses.created(res, { data: novoEtapa });
});

export const consultarPorId = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    
    const data = await Etapa.consultarPorId(id);
    
    return responses.success(res, { data });
});

export const consultarPorProjeto = asyncHandler(async (req, res, next) => {
    const data = await Etapa.consultarPorProjeto(req.params.projeto_id);    
    return responses.success(res, { message: 'Etapas encontradas', data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    
    const data = await Etapa.deletar(id);
    
    return responses.success(res, { data });
});

export const alterar = asyncHandler(async (req, res, next) => {
    let etapa = req.body;
    
    etapa.id = req.params.id;
    
    const etapaAlterada = await Etapa.alterar(etapa);
    
    return responses.success(res, { data: etapaAlterada });
});

export const alterarOrdem = asyncHandler(async (req, res, next) => {
    const ordemEtapa = req.body;

    const etapasReordenadas = await Etapa.alterarOrdem(ordemEtapa);
    
    const message = Array.isArray(etapasReordenadas) && etapasReordenadas.length === 0
        ? "Nenhuma alteração realizada"
        : undefined;
    return responses.success(res, { data: etapasReordenadas, ...(message ? { message } : {}) });
});
