import * as projetoService from './projeto.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const cadastrar = asyncHandler(async (req, res, next) => {
    let projeto = req.body;
    const novoProjeto = await projetoService.cadastrar(projeto,req.loginId);
    return responses.created(res, { message: 'Projeto cadastrado com sucesso', data: novoProjeto });
});

export const consultar = asyncHandler(async (req, res, next) => {
    const { nome, status, filtro_avancado } = req.query;
    
    if (filtro_avancado) {
        const data = await projetoService.consultarFiltroAvancado(filtro_avancado);
        return responses.success(res, { message: 'Projetos encontrados', data });
    }

    if (nome) {
        const data = await projetoService.consultar(nome);
        return responses.success(res, { message: 'Projetos encontrados', data });
    }

    if (status) {
        const data = await projetoService.consultarPorStatus(status);
        return responses.success(res, { message: 'Projetos encontrados', data });
    }

    const data = await projetoService.consultar('');
    return responses.success(res, { message: 'Projetos encontrados', data });
});


export const consultarDeletados = asyncHandler(async (req, res, next) => {
    const data = await projetoService.consultarDeletados();
    return responses.success(res, { message: 'Projetos encontrados', data });
});

export const listarStatus = asyncHandler(async (req, res, next) => {
    const data = await projetoService.listarStatus();
    return responses.success(res, { message: 'Status encontrados', data });
});

export const consultarPorId = asyncHandler(async (req, res, next) => {    
    let id = req.params.id;
    const data = await projetoService.consultarPorId(id);
    return responses.success(res, { message: 'Projeto encontrado', data });
});

export const consultarPorCodigo = asyncHandler(async (req, res, next) => {    
    let codigo = req.params.codigo;
    const data = await projetoService.consultarPorCodigo(codigo);
    return responses.success(res, { message: 'Projeto encontrado', data });
});

export const duplicar = asyncHandler(async (req, res, next) => {    
    let id = req.params.id;
    const data = await projetoService.duplicar(id, req.loginId);
    return responses.success(res, { message: 'Projeto duplicado com sucesso', data });
});

export const consultarPorData = asyncHandler(async (req, res, next) => {    
    let inicio = req.params.inicio;
    let termino = req.params.termino;
    const data = await projetoService.consultarPorData(inicio,termino);
    return responses.success(res, { message: 'Projetos encontrados', data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    const data = await projetoService.deletar(id, req.loginId);
    return responses.success(res, { message: 'Projeto deletado com sucesso', data });
});

export const alterar = asyncHandler(async (req, res, next) => {
    const projeto = req.body;
    const {id} = req.params;
    const projetoAlterado = await projetoService.alterar(id, projeto, req.loginId);
    return responses.success(res, { message: 'Projeto alterado com sucesso', data: projetoAlterado });
});

export const addResultado = asyncHandler(async (req, res, next) => {
    const resultado = req.body;
    const projetoId = req.params.id;
    const responsavelId = req.loginId;

    const data = await projetoService.addResultado(projetoId, responsavelId, resultado);

    return responses.success(res, { message: 'Resultado adicionado com sucesso', data });
});

// *************** Consultas Entre vária entidades ***********************
export const consultaDetalhada = asyncHandler(async (req, res, next) => {    
    let id = req.params.id;               
    const data = await projetoService.consultaDetalhada(id);
    return responses.success(res, { message: 'Detalhes do projeto consultados com sucesso', data });
});
