import * as Configuracao from '../models/Configuracao.js';
import * as responses from '../utils/responses.js';


export const cadastrar = async (req, res)=>{
    try {
        const configuracao = req.body; 
        const result = await Configuracao.cadastrar(configuracao);
        return responses.created(res, { data: result });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

export const alterar = async (req, res)=>{
    try {
        let configuracao = req.body;
        configuracao.id = req.params.id;
        const result = await Configuracao.alterar(configuracao);
        return responses.success(res, { data: result });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

export const consultarPorId = async (req, res)=>{
    try {
        const id = req.params.id;
        const result = await Configuracao.consultarPorId(id);
        return responses.success(res, { data: result });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const consultar = async (req, res)=>{
    try {
        const key = req.query.key;
        let result;
        if(key){
            result = await Configuracao.consultarPorKey(key);
        }
        else{
            result = await Configuracao.consultar();
        }
        return responses.success(res, { data: result });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const deletar = async (req, res)=>{
    try {
        let id = req.params.id;
        const result = await Configuracao.deletar(id);
        return responses.success(res, { data: result });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}