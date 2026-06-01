import * as produtosService from './produtos.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const cadastrar = asyncHandler(async (req, res, next) => {
    const { projeto_id } = req.params;
    const data = await produtosService.cadastrar(projeto_id);
    return responses.created(res, { message: 'Produto cadastrado com sucesso', data });
});

export const listar = asyncHandler(async (req, res, next) => {
    const query = req.query;
    const data = await produtosService.listar(query);
    return responses.success(res, { message: 'Produtos encontrados com sucesso', data });
});

export const listarStatus = asyncHandler(async (req, res, next) => {
    const data = await produtosService.listarStatus();
    return responses.success(res, { message: 'Status encontrados com sucesso', data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const loginId = req.loginId;
    const data = await produtosService.deletar(id, loginId);
    return responses.success(res, { message: 'Produto deletado com sucesso', data });
});

export const listarDeletados = asyncHandler(async (req, res, next) => {
    const data = await produtosService.listarDeletados();
    return responses.success(res, { message: 'Produtos deletados encontrados com sucesso', data });
});

export const atualizar = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const produtoData = req.body;
    const data = await produtosService.atualizar(id, produtoData);
    return responses.success(res, { message: 'Produto atualizado com sucesso', data });
});

export const consultarPorId = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = await produtosService.consultarPorId(id);
    return responses.success(res, { message: 'Produto encontrado com sucesso', data });
});
