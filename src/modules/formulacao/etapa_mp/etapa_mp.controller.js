import * as etapaMPService from './etapa_mp.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const cadastrar = asyncHandler(async (req, res, next) => {
    const etapa_mp = req.body;  
    const data = await etapaMPService.cadastrar(etapa_mp);    
    return responses.created(res, { message: 'Etapa de matéria-prima cadastrada com sucesso', data });
});

export const alterar = asyncHandler(async (req, res, next) => {
    const etapa_mp = req.body;    
    const id = req.params.id;    
    const data = await etapaMPService.alterar(id, etapa_mp);    
    return responses.success(res, { message: 'Etapa de matéria-prima alterada com sucesso', data });
});

export const consultarPorId = asyncHandler(async (req, res, next) => {
    let id = req.params.id;    
    const data = await etapaMPService.consultarPorId(id);    
    return responses.success(res, { message: 'Etapa de matéria-prima encontrada com sucesso', data });
});

export const consultarPorEtapa = asyncHandler(async (req, res, next) => {
    let etapa_id = req.params.etapa_id;    
    const data = await etapaMPService.consultarPorEtapa(etapa_id);
    return responses.success(res, { message: 'Etapas de matéria-prima encontradas com sucesso', data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    let id = req.params.id;    
    const data = await etapaMPService.deletar(id);    
    return responses.success(res, { message: 'Etapa de matéria-prima deletada com sucesso', data });
});

export const alterarOrdem = asyncHandler(async (req, res, next) => {
    const ordemEtapaMP = req.body;
    const ordemetapa_mpReordenadas = await etapaMPService.alterarOrdem(ordemEtapaMP);        
  
    return responses.success(res, { message: 'Ordem das matéria-prima nas etapas alterada com sucesso', data: ordemetapa_mpReordenadas });
});
