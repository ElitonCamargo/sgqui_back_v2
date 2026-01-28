import * as Elemento from '../models/Elemento.js';
import * as responses from '../utils/responses.js';

export const consultar = async (req, res)=>{
    try {
        let simbolo = req.query.simbolo;        
        let filtro = req.query.filtro;
        let estado = req.query.estado;
        let data;
        
        if(simbolo){
            data = await Elemento.consultarPorSimbolo(simbolo);
        }
        else if(filtro){
            data = await Elemento.consultar(filtro);
        }
        else if(estado){            
            data = await Elemento.consultarPorEstado(estado);
        }
        else{            
            data = await Elemento.consultar();
        }
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const consultarPorId = async (req, res)=>{
    try {
        let id = req.params.id;
        let data = await Elemento.consultarPorId(id);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const deletar = async (req, res)=>{
    try {
        const id = req.params.id;
        const data = await Elemento.deletar(id);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const cadastrada = async (req, res)=>{
    try {
        const elemento = req.body; 
        const novoElemento = await Elemento.cadastrar(elemento);
        return responses.created(res, { data: novoElemento });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

export const alterar = async (req, res)=>{
    try { 
        let elemento = req.body;
        elemento.id = req.params.id;
        const elementoAlterado = await Elemento.alterar(elemento);
        return responses.success(res, { data: elementoAlterado });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

