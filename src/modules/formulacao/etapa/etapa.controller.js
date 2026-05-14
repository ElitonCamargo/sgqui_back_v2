import * as etapaService from './etapa.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const cadastrar = asyncHandler(async (req, res, next) => {
    const etapa = req.body;    
    const novoEtapa = await etapaService.cadastrar(etapa);    
    return responses.created(res, { message: 'Etapa cadastrada com sucesso', data: novoEtapa });
});

export const consultarPorId = asyncHandler(async (req, res, next) => {   
    const data = await etapaService.consultarPorId(req.params.id);    
    return responses.success(res, { message: 'Etapa encontrada', data });
});

export const consultarPorProjeto = asyncHandler(async (req, res, next) => {
    const data = await etapaService.consultarPorProjeto(req.params.projeto_id);    
    return responses.success(res, { message: 'Etapas encontradas', data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    
    const data = await etapaService.deletar(id);
    
    return responses.success(res, { message: 'Etapa excluída com sucesso', data });
});

export const alterar = asyncHandler(async (req, res, next) => {   
    const etapaAlterada = await etapaService.alterar(req.params.id, req.body);    
    return responses.success(res, { message: 'Etapa alterada com sucesso', data: etapaAlterada });
});

export const alterarOrdem = asyncHandler(async (req, res, next) => {

    const data = await etapaService.alterarOrdem(req.body);   

    return responses.success(res, { message: 'Ordem das etapas alterada com sucesso', data });
});
