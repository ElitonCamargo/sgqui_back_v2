import * as Projeto from '../models/Projeto.js';
import * as responses from '../utils/responses.js';

export const consultar = async (req, res)=>{
    try {
        let nome = req.query.nome;
        let status = req.query.status;
        let filtro_avancado = req.query.filtro_avancado;
        let data = [];
        if(!filtro_avancado){
            if(nome){
                data = await Projeto.consultar(nome);
            }
            else if(status){
                data = await Projeto.consultarPorStatus(status);
            }
            else{
                data = await Projeto.consultar('');
            }
        }
        else{
            data = await Projeto.consultarFiltroAvacado(filtro_avancado);
        }
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const consultarPorId = async (req, res)=>{    
    try {
        let id = req.params.id;
        const data = await Projeto.consultarPorId(id);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const consultarPorCodigo = async (req, res)=>{    
    try {
        let codigo = req.params.codigo;
        const data = await Projeto.consultarPorCodigo(codigo);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const duplicar = async (req, res)=>{    
    try {
        let id = req.params.id;
        const data = await Projeto.duplicar(id);
        const message = Array.isArray(data) && data.length === 0
            ? "Projeto base não encontrado"
            : undefined;
        return responses.success(res, { data, ...(message ? { message } : {}) });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const consultarPorData = async (req, res)=>{    
    try {
        let inicio = req.params.inicio;
        let termino = req.params.termino;
        const data = await Projeto.consultarPorData(inicio,termino);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const deletar = async (req, res)=>{
    try {
        let id = req.params.id;
        const data = await Projeto.deletar(id);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const cadastrar = async (req, res)=>{
    try {
        let projeto = req.body;
        const novoProjeto = await Projeto.cadastrar(projeto,req.loginId);
        return responses.created(res, { data: novoProjeto });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

export const alterar = async (req, res)=>{
    try {
        let projeto = req.body;
        projeto.id = req.params.id;
        const projetoAlterado = await Projeto.alterar(projeto,req.loginId);
        return responses.success(res, { data: projetoAlterado });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

// *************** Consultas Entre vária entidades ***********************
export const consultaDetalhada = async (req, res)=>{    
    try {
        let id = req.params.id;               
        const data = await Projeto.consultaDetalhada(id);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

