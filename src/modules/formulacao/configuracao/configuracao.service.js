import * as ConfiguracaoModel from './configuracao.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (configuracao={key:'', value:{}}) => {
    return await ConfiguracaoModel.cadastrar(configuracao);
};

export const alterar = async (configuracao={}, responsavel) => {
    return await ConfiguracaoModel.alterar(configuracao, responsavel);
};

export const consultar = async () => {
    return await ConfiguracaoModel.consultar();
};

export const consultarPorKey = async (key) => {
    return await ConfiguracaoModel.consultarPorKey(key);
};

export const deletar = async (key) => {
    const data = await ConfiguracaoModel.deletar(key);
    if(!data) {
        throw new AppError({
            title: 'Erro ao excluir configuração',
            message: 'Não foi possível excluir a configuração informada.',
            details: `Nenhuma configuração encontrada para exclusão com a chave "${key}".`,
            code: 404
        });
    }
    return data;
};
