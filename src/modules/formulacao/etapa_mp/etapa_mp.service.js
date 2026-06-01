import * as EtapaMPModel from './etapa_mp.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (etapa_mp={}) => {
    const data = await EtapaMPModel.cadastrar(etapa_mp);
    if (!data) {
        throw new AppError({
            title: 'Erro ao cadastrar etapa de matéria-prima',
            message: 'Não foi possível cadastrar a etapa de matéria-prima.',
            details: `O cadastro não retornou registro válido para etapa ${etapa_mp.etapa_id ?? 'não informada'} e matéria-prima ${etapa_mp.materia_prima_id ?? 'não informada'}.`,
            code: 500
        });
    }
    return data;
};

export const alterar = async (id=0, etapa_mp={}) => {
    const data = await EtapaMPModel.alterar(id, etapa_mp);
    if (!data) {
        throw new AppError({
            title: 'Erro ao atualizar etapa de matéria-prima',
            message: 'Não foi possível atualizar a etapa de matéria-prima informada.',
            details: `Nenhuma etapa de matéria-prima encontrada para atualização com o ID ${id}.`,
            code: 404
        });
    }
    return data;
};

export const alterarOrdem = async (ordemEtapaMP=[]) => {
    const data = await EtapaMPModel.alterarOrdem(ordemEtapaMP);
    if (data.length === 0) {
        throw new AppError({
            title: 'Erro ao reordenar etapas de matéria-prima',
            message: 'Não foi possível atualizar a ordem das etapas de matéria-prima informadas.',
            details: `Nenhuma etapa de matéria-prima foi atualizada na reordenação. IDs recebidos: ${ordemEtapaMP.map(({ id }) => id).join(', ')}.`,
            code: 404
        });
    }
    return data;
};

export const consultar = async (filtro = '') => {
    const data = await EtapaMPModel.consultar(filtro);
    if(data.length === 0) {
        throw new AppError({
            title: 'Erro ao buscar etapas de matéria-prima',
            message: 'Nenhuma etapa de matéria-prima foi encontrada para o filtro informado.',
            details: `Consulta sem resultado para etapas de matéria-prima com filtro "${filtro}".`,
            code: 404
        });
    }
    return data;
};

export const consultarPorId = async (id) => {
    const data = await EtapaMPModel.consultarPorId(id);
    if (!data) {
        throw new AppError({
            title: 'Erro ao buscar etapa de matéria-prima',
            message: 'A etapa de matéria-prima informada não foi encontrada.',
            details: `Nenhuma etapa de matéria-prima encontrada para o ID ${id}.`,
            code: 404
        });
    }
    return data;
};

export const consultarPorEtapa = async (etapa_id) => {
    const data = await EtapaMPModel.consultarPorEtapa(etapa_id);
    if (data.length === 0) {
        throw new AppError({
            title: 'Erro ao buscar etapas de matéria-prima',
            message: 'Nenhuma etapa de matéria-prima foi encontrada para a etapa informada.',
            details: `Nenhuma etapa de matéria-prima encontrada para a etapa ${etapa_id}.`,
            code: 404
        });
    }
    return data;
};

export const deletar = async (id) => {
    const data = await EtapaMPModel.deletar(id);
    if (!data) {
        throw new AppError({
            title: 'Erro ao excluir etapa de matéria-prima',
            message: 'Não foi possível excluir a etapa de matéria-prima informada.',
            details: `Nenhuma etapa de matéria-prima encontrada para exclusão com o ID ${id}.`,
            code: 404
        });
    }
    return data;
};
