import * as Nutriente from '../models/Nutriente.js';
import * as responses from '../utils/responses.js';

export const consultar = async (req, res)=>{
    try {
        let nome = req.query.nome;
        nome = nome?nome:'';
        const data = await Nutriente.consultar(nome);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const consultarPorId = async (req, res)=>{    
    try {
        let id = req.params.id;
        const data = await Nutriente.consultarPorId(id);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const deletar = async (req, res)=>{
    try {
        let id = req.params.id;
        const data = await Nutriente.deletar(id);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const cadastrada = async (req, res)=>{
    try {
        const nutriente = req.body; 
        const novoNutriente = await Nutriente.cadastrar(nutriente);
        return responses.created(res, { data: novoNutriente });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

export const alterar = async (req, res)=>{
    try {
        let nutriente = req.body;
        nutriente.id = req.params.id;
        const nutrienteAlterado = await Nutriente.alterar(nutriente);
        return responses.success(res, { data: nutrienteAlterado });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

