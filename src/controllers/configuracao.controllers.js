import * as Configuracao from '../models/Configuracao.model.js';
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
        configuracao.key = req.params.key;

        const result = await Configuracao.alterar(configuracao, req.loginId);
        return responses.success(res, { data: result });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

export const consultarPorKey = async (req, res)=>{
    try {
        const key = req.params.key;
        const result = await Configuracao.consultarPorKey(key);
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
        let key = req.params.key;
        const result = await Configuracao.deletar(key);
        if(!result){
            return responses.notFound(res, { message: 'Configuração não encontrada' });
        }
        return responses.success(res, { message: 'Configuração deletada com sucesso', data: [] });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}