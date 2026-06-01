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
            title: 'Erro ao buscar matérias-primas',
            message: 'Nenhuma matéria-prima foi encontrada para o filtro informado.',
            details: `Consulta de matérias-primas sem resultado para filtros: ${JSON.stringify(query)}.`,
            code: 404
        });
    }
    return data;
};


export const consultarPorId = async (id) => {
    if (!id || isNaN(id)) {
        throw new AppError({
            title: 'Erro ao buscar matéria-prima',
            message: 'Informe um identificador válido para consultar a matéria-prima.',
            details: `Valor recebido para o ID da matéria-prima: ${id}.`,
            code: 400
        });
    }
    const data = await MateriaPrimaModel.consultarPorId(id);
    if (!data) {
        throw new AppError({
            title: 'Erro ao buscar matéria-prima',
            message: 'A matéria-prima informada não foi encontrada.',
            details: `Nenhuma matéria-prima encontrada para o ID ${id}.`,
            code: 404
        });
    }
    return data;
};

export const consultarPorCodigo = async (codigo) => {
    if (!codigo) {
        throw new AppError({
            title: 'Erro ao buscar matéria-prima',
            message: 'Informe um código válido para consultar a matéria-prima.',
            details: `Valor recebido para o código da matéria-prima: ${codigo}.`,
            code: 400
        });
    }
    return await MateriaPrimaModel.consultarPorCodigo(codigo);
};

export const consultarPorCas_number = async (cas_number) => {
    if (!cas_number) {
        throw new AppError({
            title: 'Erro ao buscar matéria-prima',
            message: 'Informe um CAS Number válido para consultar a matéria-prima.',
            details: `Valor recebido para o CAS Number: ${cas_number}.`,
            code: 400
        });
    }
    return await MateriaPrimaModel.consultarPorCas_number(cas_number);
};

export const consultarPorFormula = async (formula) => {
    if (!formula) {
        throw new AppError({
            title: 'Erro ao buscar matéria-prima',
            message: 'Informe uma fórmula válida para consultar a matéria-prima.',
            details: `Valor recebido para a fórmula da matéria-prima: ${formula}.`,
            code: 400
        });
    }
    const data = await MateriaPrimaModel.consultarPorFormula(formula);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Erro ao buscar matérias-primas',
            message: 'Nenhuma matéria-prima foi encontrada para a fórmula informada.',
            details: `Nenhuma matéria-prima encontrada para a fórmula ${formula}.`,
            code: 404
        });
    }
    return data;
};

export const consultarMP_precentual_nutriente = async (nutrienteID=0,percentual=0.0) => {
    if (!nutrienteID || isNaN(nutrienteID)) {
        throw new AppError({
            title: 'Erro ao buscar matérias-primas por nutriente',
            message: 'Informe um identificador válido para o nutriente.',
            details: `Valor recebido para o ID do nutriente: ${nutrienteID}.`,
            code: 400
        });
    }
    if (!percentual || isNaN(percentual)) {
        throw new AppError({
            title: 'Erro ao buscar matérias-primas por nutriente',
            message: 'Informe um percentual válido para realizar a consulta.',
            details: `Valor recebido para o percentual: ${percentual}.`,
            code: 400
        });
    }
    const data = await MateriaPrimaModel.consultarMP_precentual_nutriente(nutrienteID, percentual);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Erro ao buscar matérias-primas por nutriente',
            message: 'Nenhuma matéria-prima foi encontrada para o nutriente e percentual informados.',
            details: `Nenhuma matéria-prima encontrada para nutriente ${nutrienteID} com percentual ${percentual}.`,
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
            message: 'Não foi possível cadastrar a matéria-prima.',
            details: `O cadastro da matéria-prima não retornou registro válido para código ${materia_prima?.codigo ?? 'não informado'}.`,
            code: 500
        });
    }
    return novoMateria_prima;
};

export const alterar = async (materia_prima) => {
    const resultado = await MateriaPrimaModel.alterar(materia_prima);
    if (!resultado) {
        throw new AppError({
            title: 'Erro ao atualizar matéria-prima',
            message: 'Não foi possível atualizar a matéria-prima informada.',
            details: `Nenhuma matéria-prima encontrada para atualização com o ID ${materia_prima.id}.`,
            code: 404
        });
    }
    return resultado;
};

export const deletar = async (id) => {
    if (!id || isNaN(id)) {
        throw new AppError({
            title: 'Erro ao excluir matéria-prima',
            message: 'Informe um identificador válido para excluir a matéria-prima.',
            details: `Valor recebido para o ID da matéria-prima: ${id}.`,
            code: 400
        });
    }
    const resultado = await MateriaPrimaModel.deletar(id);
    if (!resultado) {
        throw new AppError({
            title: 'Erro ao excluir matéria-prima',
            message: 'Não foi possível excluir a matéria-prima informada.',
            details: `Falha ao excluir a matéria-prima com ID ${id}; o registro pode não existir ou possuir vínculos que impedem a exclusão.`,
            code: 500
        });
    }
    return resultado;
};
