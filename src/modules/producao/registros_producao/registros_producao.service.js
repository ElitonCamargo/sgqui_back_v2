import * as registros_producaoModel from './registros_producao.model.js';
import { AppError } from '../../../core/utils/AppError.js';
import { hasOwnKey } from '../../../core/utils/helpers.js';

export const cadastrar = async (registro_producao={
    produto_id: 0,
    usuario_id: 0,
    quantidade: 0,
    unid_medida: 'L',
    tanque: '',
    observacao: ''
}) => {
    const data = await registros_producaoModel.cadastrar(registro_producao);
    if (!data) {
        throw new AppError({
            title: 'Erro ao cadastrar registro de produção',
            message: 'Não foi possível cadastrar o registro de produção.',
            details: `O cadastro do registro de produção não retornou resultado válido para produto ${registro_producao.produto_id} e usuário ${registro_producao.usuario_id}.`,
            code: 500
        });
    }
    return data;
};

export const listar = async (query) => {
    const validKeys = ['produto_id', 'usuario_id', 'n_desenvolvimento', 'unid_medida', 'descricao', 'periodo'];
    const filteredQuery = Object.fromEntries(
        Object.entries(query).filter(([key]) => validKeys.includes(key))
    );
    const data = await registros_producaoModel.listar(filteredQuery);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Erro ao listar registros de produção',
            message: 'Nenhum registro de produção foi encontrado para os filtros informados.',
            details: `Consulta de registros de produção sem resultado para filtros: ${JSON.stringify(filteredQuery)}.`,
            code: 404
        });
    }
    return data;
};

export const deletar = async (id, loginId) => {
    const result = await registros_producaoModel.deletar(id, loginId);
    if (!result) {
        throw new AppError({
            title: 'Erro ao excluir registro de produção',
            message: 'Não foi possível excluir o registro de produção informado.',
            details: `Nenhum registro de produção encontrado para exclusão com o ID ${id} pelo usuário ${loginId}.`,
            code: 404
        });
    }
    return result;
};

export const listarDeletados = async () => {
    const data = await registros_producaoModel.listarDeletados();
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Erro ao listar registros excluídos',
            message: 'Nenhum registro de produção excluído foi encontrado.',
            details: 'A listagem de registros de produção excluídos não retornou dados.',
            code: 404
        });
    }
    return data;
};

export const consultarPorId = async (id) => {
    const produto = await registros_producaoModel.consultarPorId(id);
    if (!produto) {
        throw new AppError({
            title: 'Erro ao buscar registro de produção',
            message: 'O registro de produção informado não foi encontrado.',
            details: `Nenhum registro de produção encontrado para o ID ${id}.`,
            code: 404
        });
    }
    return produto;
};

export const atualizar = async (id, registros_producao) => {
    if (hasOwnKey(registros_producao, 'produto_id')) {
       delete registros_producao.produto_id; // Impede a atualização do produto_id, que é uma FK e não deve ser alterada após a criação do registro de produção
    }
    if (hasOwnKey(registros_producao, 'usuario_id')) {
       delete registros_producao.usuario_id; // Impede a atualização do usuario_id, que é uma FK e não deve ser alterada após a criação do registro de produção
    }
    const data = await registros_producaoModel.atualizar(id, registros_producao);
    if (!data) {
        throw new AppError({
            title: 'Erro ao atualizar registro de produção',
            message: 'Não foi possível atualizar o registro de produção informado.',
            details: `Nenhum registro de produção encontrado para atualização com o ID ${id}.`,
            code: 404
        });
    }
    return data;
};
