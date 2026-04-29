import * as projetoModel from './projeto.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async ({ nome, descricao = null }) => {
    return await projetoModel.cadastrar({ nome, descricao });
};

export const addResultado = async (projetoId, responsavelId, resultado={}) => {
    if(projetoId == null || projetoId.trim() === ''){
        throw new AppError({
            message: 'ID do projeto é obrigatório',
            reason: "O parâmetro 'projetoId' não foi fornecido ou está vazio; é necessário identificar o projeto ao qual o resultado será vinculado",
            code: 400
        });
    }
    if(resultado == null || typeof resultado !== 'object'){
        throw new AppError({
            message: 'Resultado deve ser um objeto',
            reason: "O campo 'resultado' deve ser um objeto com os dados do resultado a ser adicionado ao projeto",
            code: 400
        });
    }
    resultado.id_responsavel = responsavelId;        
    return await projetoModel.addResultado(projetoId, resultado);        
};

export const consultar = async (filtro = '') => {
    return await projetoModel.consultar(filtro);
};

export const consultarFiltroAvacado = async (filtro = []) => {
    return await projetoModel.consultarFiltroAvacado(filtro);
};

export const estruturarProjeto = (dados) => {
    return projetoModel.estruturarProjeto(dados);
};

export const consultarPorId = async (id) => {
    return await projetoModel.consultarPorId(id);
};

export const consultarPorCodigo = async (codigo) => {
    return await projetoModel.consultarPorCodigo(codigo);
};

export const consultarPorData = async (data_inicio="", data_termino="") => {
    return await projetoModel.consultarPorData(data_inicio, data_termino);
};

export const consultarPorStatus = async (status='') => {
    return await projetoModel.consultarPorStatus(status);
};

export const deletar = async (id) => {
    return await projetoModel.deletar(id);
};

export const consultaDetalhada = async (id) => {
    return await projetoModel.consultaDetalhada(id);
};
