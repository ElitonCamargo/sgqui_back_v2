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
            message: 'Erro ao cadastrar registro de produção',
            reason: 'Ocorreu um erro ao tentar cadastrar o registro de produção. Verifique os dados fornecidos e tente novamente.',
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
            message: 'Nenhum registro de produção encontrado',
            reason: 'Não existem registros de produção que correspondam aos critérios de busca fornecidos. Verifique os parâmetros e tente novamente.',
            code: 404
        });
    }
    return data;
};

export const deletar = async (id, loginId) => {
    const result = await registros_producaoModel.deletar(id, loginId);
    if (!result) {
        throw new AppError({
            message: 'Registro de produção não encontrado',
            reason: `Não existe um registro de produção com o ID ${id}. Verifique o ID e tente novamente.`,
            code: 404
        });
    }
    return result;
};

export const listarDeletados = async () => {
    const data = await registros_producaoModel.listarDeletados();
    if (!data || data.length === 0) {
        throw new AppError({
            message: 'Nenhum registro de produção deletado encontrado',
            reason: 'Não existem registros de produção deletados que correspondam aos critérios de busca fornecidos. Verifique os parâmetros e tente novamente.',
            code: 404
        });
    }
    return data;
};

export const consultarPorId = async (id) => {
    const produto = await registros_producaoModel.consultarPorId(id);
    if (!produto) {
        throw new AppError({
            message: 'Registro de produção não encontrado',
            reason: `Não existe um registro de produção com o ID ${id}. Verifique o ID e tente novamente.`,
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
            message: 'Registro de produção não encontrado para atualização',
            reason: `Não existe um registro de produção com o ID ${id} para atualizar. Verifique o ID e os dados fornecidos, e tente novamente.`,
            code: 404
        });
    }
    return data;
};
