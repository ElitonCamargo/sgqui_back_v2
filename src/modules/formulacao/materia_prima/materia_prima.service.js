import * as MateriaPrimaModel from './materia_prima.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const consultar = async (query = {}) => {
    const {
        nome,
        formula,
        codigo,
        cas_number,
        nutriente,
        percentual
    } = query;

    let data;

    if(nome){
        data = await MateriaPrimaModel.consultar(nome);
    }
    else if(formula){
        data = await consultarPorFormula(formula);            
    }
    else if(codigo){
        data = await consultarPorCodigo(codigo);
    }
    else if(cas_number){
        data = await consultarPorCas_number(cas_number);
    }
    else if(nutriente && percentual){
        data = await consultarMP_precentual_nutriente(nutriente,percentual);
    }
    else{
        data = await MateriaPrimaModel.consultar();
    }
     if (!data || data.length === 0) {
        throw new AppError({
            title: 'Nenhuma matéria-prima encontrada',
            message: 'Nenhuma matéria-prima foi encontrada para o filtro aplicado.',
            code: 404
        });
    }
    return data;
};


export const consultarPorId = async (id) => {
    if (!id || isNaN(id)) {
        throw new AppError({
            title: 'ID inválido',
            message: 'O ID fornecido para consulta de matéria-prima é inválido. Certifique-se de que é um número inteiro positivo.',
            code: 400
        });
    }
    const data = await MateriaPrimaModel.consultarPorId(id);
    if (!data) {
        throw new AppError({
            title: 'Matéria-prima não encontrada',
            message: `Nenhuma matéria-prima foi encontrada com o ID ${id} na base de dados.`,
            code: 404
        });
    }
    return data;
};

export const consultarPorCodigo = async (codigo) => {
    if (!codigo) {
        throw new AppError({
            title: 'Código inválido',
            message: 'O código fornecido para consulta de matéria-prima é inválido.',
            code: 400
        });
    }
    return await MateriaPrimaModel.consultarPorCodigo(codigo);
};

export const consultarPorCas_number = async (cas_number) => {
    if (!cas_number) {
        throw new AppError({
            title: 'CAS Number inválido',
            message: 'O CAS Number fornecido para consulta de matéria-prima é inválido.',
            code: 400
        });
    }
    return await MateriaPrimaModel.consultarPorCas_number(cas_number);
};

export const consultarPorFormula = async (formula) => {
    if (!formula) {
        throw new AppError({
            title: 'Fórmula inválida',
            message: 'A fórmula química fornecida para consulta de matéria-prima é inválida.',
            code: 400
        });
    }
    const data = await MateriaPrimaModel.consultarPorFormula(formula);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Nenhuma matéria-prima encontrada',
            message: 'Nenhuma matéria-prima foi encontrada para a fórmula química informada.',
            code: 404
        });
    }
    return data;
};

export const consultarMP_precentual_nutriente = async (nutrienteID=0,percentual=0.0) => {
    if (!nutrienteID || isNaN(nutrienteID)) {
        throw new AppError({
            title: 'ID do nutriente inválido',
            message: 'O ID do nutriente fornecido para consulta é inválido. Informe um número inteiro positivo.',
            code: 400
        });
    }
    if (!percentual || isNaN(percentual)) {
        throw new AppError({
            title: 'Percentual inválido',
            message: 'O percentual fornecido para consulta é inválido. Informe um valor numérico positivo.',
            code: 400
        });
    }
    const data = await MateriaPrimaModel.consultarMP_precentual_nutriente(nutrienteID, percentual);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Nenhuma matéria-prima encontrada',
            message: 'Nenhuma matéria-prima foi encontrada para o nutriente e percentual informados.',
            code: 404
        });
    }
    return data;
};

export const cadastrar = async (materia_prima) => {
    const novoMateria_prima = await MateriaPrimaModel.cadastrar(materia_prima);
    if (!novoMateria_prima) {
        throw new AppError({
            title: 'Erro ao cadastrar matéria-prima',
            message: 'Não foi possível cadastrar a matéria-prima. Verifique os dados e tente novamente.',
            code: 500
        });
    }
    return novoMateria_prima;
};

export const alterar = async (materia_prima) => {
    const resultado = await MateriaPrimaModel.alterar(materia_prima);
    if (!resultado) {
        throw new AppError({
            title: 'Matéria-prima não encontrada',
            message: `Nenhuma matéria-prima foi encontrada com o ID ${materia_prima.id} para atualização.`,
            code: 404
        });
    }
    return resultado;
};

export const deletar = async (id) => {
    if (!id || isNaN(id)) {
        throw new AppError({
            title: 'ID inválido',
            message: 'O ID fornecido para remoção de matéria-prima é inválido. Certifique-se de que é um número inteiro positivo.',
            code: 400
        });
    }
    const resultado = await MateriaPrimaModel.deletar(id);
    if (!resultado) {
        throw new AppError({
            title: 'Erro ao deletar matéria-prima',
            message: 'Não foi possível excluir a matéria-prima. Verifique se o ID é válido e tente novamente.',
            code: 500
        });
    }
    return resultado;
};
