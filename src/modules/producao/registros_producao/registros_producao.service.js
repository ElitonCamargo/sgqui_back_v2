import * as registros_producaoModel from './registros_producao.model.js';
import { AppError } from '../../../core/utils/AppError.js';
import { hasOwnKey } from '../../../core/utils/helpers.js';



/**
 * Cadastra um novo registro de produção.
 *
 * @async
 * @function cadastrar
 * @param {Object} registro_producao - Dados do registro de produção a ser cadastrado.
 * @param {number} [registro_producao.produto_id] - ID do produto (inteiro positivo).
 * @param {number} [registro_producao.usuario_id] - ID do usuário (inteiro positivo).
 * @param {number} [registro_producao.quantidade] - Quantidade produzida (não negativa).
 * @param {'L'|'Kg'} [registro_producao.unid_medida] - Unidade de medida: "L" (Litros) ou "Kg" (Quilogramas).
 * @param {string} [registro_producao.lote_pa] - Lote do produto acabado (máx. 100 caracteres).
 * @param {string} [registro_producao.codigo] - Código do registro (máx. 100 caracteres).
 * @param {string} [registro_producao.tanque] - Identificação do tanque (máx. 50 caracteres).
 * @param {string} [registro_producao.data_inspecao] - Data de inspeção no formato YYYY-MM-DD.
 * @param {string} [registro_producao.inspecionado_por] - Nome do responsável pela inspeção (máx. 100 caracteres).
 * @param {string} [registro_producao.validado_por] - Nome do responsável pela validação (máx. 100 caracteres).
 * @param {string} [registro_producao.data_separacao] - Data de separação no formato YYYY-MM-DD.
 * @param {string} [registro_producao.hora_separacao] - Hora de separação no formato HH:MM ou HH:MM:SS.
 * @param {string} [registro_producao.responsavel_separacao] - Nome do responsável pela separação (máx. 100 caracteres).
 * @param {string} [registro_producao.data_inicio_envase] - Data de início do envase no formato YYYY-MM-DD.
 * @param {string} [registro_producao.data_fim_envase] - Data de fim do envase no formato YYYY-MM-DD.
 * @param {string} [registro_producao.responsavel_linha_envase] - Nome do responsável pela linha de envase (máx. 100 caracteres).
 * @param {string} [registro_producao.amostra_laboratorio] - Descrição da amostra de laboratório (máx. 255 caracteres).
 * @param {string} [registro_producao.responsavel_laboratorio] - Nome do responsável pelo laboratório (máx. 100 caracteres).
 * @param {string} [registro_producao.separado_operador] - Nome do operador responsável pela separação (máx. 100 caracteres).
 * @param {string} [registro_producao.hora_inicio] - Hora de início no formato HH:MM ou HH:MM:SS.
 * @param {string} [registro_producao.data_inicio] - Data de início no formato YYYY-MM-DD.
 * @param {string} [registro_producao.hora_final] - Hora final no formato HH:MM ou HH:MM:SS.
 * @param {string} [registro_producao.data_final] - Data final no formato YYYY-MM-DD.
 * @param {string} [registro_producao.conferido_por] - Nome do responsável pela conferência (máx. 100 caracteres).
 * @param {string} [registro_producao.nome_responsavel_laboratorio] - Nome do responsável pelo laboratório (máx. 100 caracteres).
 * @param {string} [registro_producao.volumes_embalagens] - Informações de volumes e embalagens.
 * @param {string} [registro_producao.observacao] - Observação adicional.
 * @param {Record<string, unknown>} [registro_producao.op_extra] - Dados extras em formato JSON.
 * @param {Record<string, unknown>} [registro_producao.orde_servico] - Ordem de serviço em formato JSON.
 * @returns {Promise<Object>} Dados do registro de produção cadastrado.
 * @throws {AppError} Se o cadastro não retornar um resultado válido (HTTP 500).
 */
export const cadastrar = async (registros_producao={}) => {
    if (hasOwnKey(registros_producao, 'op_extra')) {
       registros_producao.op_extra = JSON.stringify(registros_producao.op_extra); // Converte o campo op_extra para string JSON antes de salvar no banco
    }
    if (hasOwnKey(registros_producao, 'orde_servico')) {
       registros_producao.orde_servico = JSON.stringify(registros_producao.orde_servico); // Converte o campo orde_servico para string JSON antes de salvar no banco
    }
    const data = await registros_producaoModel.cadastrar(registros_producao);
    if (!data) {
        throw new AppError({
            title: 'Erro ao cadastrar registro de produção',
            message: 'Não foi possível cadastrar o registro de produção.',
            details: `O cadastro do registro de produção não retornou resultado válido para produto ${registros_producao.produto_id} e usuário ${registros_producao.usuario_id}.`,
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
    if (hasOwnKey(registros_producao, 'op_extra')) {
       registros_producao.op_extra = JSON.stringify(registros_producao.op_extra); // Converte o campo op_extra para string JSON antes de salvar no banco
    }
    if (hasOwnKey(registros_producao, 'orde_servico')) {
       registros_producao.orde_servico = JSON.stringify(registros_producao.orde_servico); // Converte o campo orde_servico para string JSON antes de salvar no banco
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
