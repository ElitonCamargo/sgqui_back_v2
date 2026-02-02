import * as Elemento from '../services/elemento.service.js';
import * as responses from '../utils/responses.js';
import { asyncHandler } from '../utils/asyncHandler.js';



export const consultar = asyncHandler(async (req, res, next)=>{
        const query = req.query;
        let data = await Elemento.consultar(query);
        return responses.success(res, { message: 'Elementos consultados com sucesso', data });
});

export const consultarPorId = asyncHandler(async (req, res, next)=>{
        let id = req.params.id;
        let data = await Elemento.consultarPorId(id);
        return responses.success(res, { message: 'Elemento consultado com sucesso', data });
});

export const consultarPorSimbolo = asyncHandler(async (req, res, next)=>{
        let simbolo = req.params.simbolo;
        let data = await Elemento.consultarPorSimbolo(simbolo);
        return responses.success(res, { message: 'Elemento consultado com sucesso', data });
});

// export const deletar = async (req, res)=>{
//     try {
//         const id = req.params.id;
//         const data = await Elemento.deletar(id);
//         return responses.success(res, { data });
//     } catch (error) {
//         return responses.error(res, { message: error.message });
//     }
// }

// export const cadastrada = async (req, res)=>{
//     try {
//         const elemento = req.body; 
//         const novoElemento = await Elemento.cadastrar(elemento);
//         return responses.created(res, { data: novoElemento });
//     } catch (error) {
//         return responses.error(res,{ message: error.message });
//     }
// }

// export const alterar = async (req, res)=>{
//     try { 
//         let elemento = req.body;
//         elemento.id = req.params.id;
//         const elementoAlterado = await Elemento.alterar(elemento);
//         return responses.success(res, { data: elementoAlterado });
//     } catch (error) {
//         return responses.error(res,{ message: error.message });
//     }
// }

