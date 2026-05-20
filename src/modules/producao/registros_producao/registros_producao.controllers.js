import * as registros_producaoService from './registros_producao.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const cadastrar = asyncHandler(async (req, res, next) => {
    const registro_producao = req.body;
    registro_producao.usuario_id = req.loginId; 
    const data = await registros_producaoService.cadastrar(registro_producao);
    return responses.created(res, { message: 'Registro de produção cadastrado com sucesso', data });
});

export const listar = asyncHandler(async (req, res, next) => {
    const query = req.query;
    const data = await registros_producaoService.listar(query);
    return responses.success(res, { message: 'Registros de produção encontrados com sucesso', data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const loginId = req.loginId;
    const data = await registros_producaoService.deletar(id, loginId);
    return responses.success(res, { message: 'Registro de produção deletado com sucesso', data });
});

export const listarDeletados = asyncHandler(async (req, res, next) => {
    const data = await registros_producaoService.listarDeletados();
    return responses.success(res, { message: 'Registros de produção deletados encontrados com sucesso', data });
});

export const atualizar = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const registroData = req.body;
    const data = await registros_producaoService.atualizar(id, registroData);
    return responses.success(res, { message: 'Registro de produção atualizado com sucesso', data });
});

export const consultarPorId = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = await registros_producaoService.consultarPorId(id);
    return responses.success(res, { message: 'Registro de produção encontrado com sucesso', data });
});
