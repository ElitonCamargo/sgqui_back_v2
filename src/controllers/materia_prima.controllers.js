import * as MateriaPrima from '../models/MateriaPrima.js';
import * as responses from '../utils/responses.js';

export const consultar = async (req, res)=>{
    try {
        let data;
        const {
            nome,
            formula,
            codigo,
            cas_number,
            nutriente,
            percentual
        } = req.query;
        
        if(nome){
            data = await MateriaPrima.consultar(nome);
        }
        else if(formula){
            data = await MateriaPrima.consultarPorFormula(formula);            
        }
        else if(codigo){
            data = await MateriaPrima.consultarPorCodigo(codigo);
        }
        else if(cas_number){
            data = await MateriaPrima.consultarPorCas_number(cas_number);
        }
        else if(nutriente && percentual){
            data = await MateriaPrima.consultarMP_precentual_nutriente(nutriente,percentual);
        }
        else{
            data = await MateriaPrima.consultar();
        }        
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const consultarPorId = async (req, res)=>{
    try {
        const id = req.params.id;
        const data = await MateriaPrima.consultarPorId(id);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const consultarMP_precentual_nutriente = async (req, res)=>{
    try {
        const nutriente = req.params.nutriente
        const percentual = req.params.percentual;
        const data = await MateriaPrima.consultarMP_precentual_nutriente(nutriente,percentual);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const deletar = async (req, res)=>{
    try {
        const id = req.params.id;
        const data = await MateriaPrima.deletar(id);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const cadastrada = async (req, res)=>{
    try {
        const materia_prima = req.body; 
        const novoMateria_prima= await MateriaPrima.cadastrar(materia_prima);
        return responses.created(res, { data: novoMateria_prima });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

export const alterar = async (req, res)=>{
    try {
        let materia_prima = req.body;
        materia_prima.id = req.params.id;
        const materia_primaAlterado = await MateriaPrima.alterar(materia_prima);
        return responses.success(res, { data: materia_primaAlterado });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

