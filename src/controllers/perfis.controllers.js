import * as perfisService from '../services/perfisService.js';
import * as responses from '../utils/responses.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const cadastrar = asyncHandler(async (req, res, next) => {
    const result = await perfisService.cadastrar(req.body);
    responses.created(res, {
        message: 'Perfil cadastrado com sucesso',
        data: result
    })
});

export const listar = asyncHandler(async (req, res, next) => {
    const result = await perfisService.listar();
    responses.success(res, { 
        message: 'Perfis consultados com sucesso', 
        data: result 
    });
});

export const listarPorId = asyncHandler(async (req, res, next) => {
    const result = await perfisService.listarPorId(req.params.id);
    responses.success(res, { 
        message: 'Perfil consultado com sucesso', 
        data: result 

    });
});

export const listarPorNome = asyncHandler(async (req, res, next) => {
    const result = await perfisService.listarPorNome(req.params.nome);
    responses.success(res, { 
        message: 'Perfil consultado com sucesso', 
        data: result 

    });
});

export const alterar = asyncHandler(async (req, res, next) => {
    const result = await perfisService.alterar(req.params.id, req.body);
    responses.success(res, { 
        message: 'Perfil alterado com sucesso', 
        data: result 
    });
});

export const remover = asyncHandler(async (req, res, next) => {
    await perfisService.remover(req.params.id);
    responses.noContent(res, { message: 'Perfil removido com sucesso' });
});
