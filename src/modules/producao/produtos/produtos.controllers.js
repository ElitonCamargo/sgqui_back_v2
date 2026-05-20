import * as produtosService from './produtos.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const listar = asyncHandler(async (req, res, next) => {
    const query = req.query;
    const data = await produtosService.listar(query);
    return responses.success(res, { message: 'Produtos encontrados com sucesso', data });
});

export const consultarPorId = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const quant_producao = Number(req.query.quant_producao) || 1;
    const data = await produtosService.consultarPorId(id, quant_producao);
    return responses.success(res, { message: 'Produto encontrado com sucesso', data });
});
