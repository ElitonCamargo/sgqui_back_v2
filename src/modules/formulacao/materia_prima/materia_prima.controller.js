import * as MateriaPrima from './materia_prima.service.js';
import * as responses from '../../../core/utils/responses.js';
import { asyncHandler } from '../../../core/utils/asyncHandler.js';

export const consultar = asyncHandler(async (req, res, next) => {
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
    return responses.success(res, { message: "Consulta realizada com sucesso", data });
});

export const consultarPorId = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = await MateriaPrima.consultarPorId(id);
    return responses.success(res, { message: "Consulta realizada com sucesso", data });
});

export const consultarMP_precentual_nutriente = asyncHandler(async (req, res, next) => {
    const nutriente = req.params.nutriente
    const percentual = req.params.percentual;
    const data = await MateriaPrima.consultarMP_precentual_nutriente(nutriente,percentual);
    return responses.success(res, { message: "Consulta realizada com sucesso", data });
});

export const deletar = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await MateriaPrima.deletar(id);
    if(!result){
        return responses.notFound(res, { message: "Matéria-prima não encontrada para remoção" });
    }
    return responses.success(res, { message: "Matéria-prima removida com sucesso", data: null });
});

export const cadastrar = asyncHandler(async (req, res, next) => {
    const materia_prima = req.body; 
    const novoMateria_prima= await MateriaPrima.cadastrar(materia_prima);
    return responses.created(res, { message: "Matéria-prima cadastrada com sucesso", data: novoMateria_prima });
});

export const alterar = asyncHandler(async (req, res, next) => {
    let materia_prima = req.body;
    materia_prima.id = req.params.id;
    const materia_primaAlterado = await MateriaPrima.alterar(materia_prima);
    return responses.success(res, { message: "Matéria-prima alterada com sucesso", data: materia_primaAlterado });
});
