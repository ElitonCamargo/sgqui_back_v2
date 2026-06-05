import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

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
export const cadastrar = async (registro_producao={}) => {
    try {
        const [result] = await pool.query('INSERT INTO registros_producao SET ?', [registro_producao]);
       return await consultarPorId(result.insertId);
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao cadastrar registro de produção',
            message: 'Não foi possível cadastrar o registro de produção. Verifique os dados fornecidos.',
            details: error.message,
            code: 500
        });
    }
};

/**
 * Lista registros de produção aplicando filtros dinâmicos.
 *
 * @async
 * @function listar
 * @param {Object} [query={ produto_id: 0, usuario_id: 0, n_desenvolvimento: '', descricao: '', unid_medida: 'L', periodo: ['2020-01-01','2020-12-31'] }] - Objeto com filtros da consulta.
 * @param {number} [query.produto_id=0] - ID do produto para filtro parcial via `LIKE`.
 * @param {string} [query.n_desenvolvimento=''] - Número de desenvolvimento para filtro parcial via `LIKE`.
 * @param {string} [query.descricao=''] - Descrição para filtro parcial via `LIKE`.
 * @param {string} [query.unid_medida='L'] - Unidade de medida para filtro exato.
 * @param {string[]} [query.periodo=['2020-01-01','2020-12-31']] - Período de referência informado no filtro.
 * @returns {Promise<Array<Object>>} Lista de registros de produção encontrados.
 * @throws {AppError} Lança erro quando falha a execução da consulta no banco de dados.
 */
export const listar = async (query={produto_id: 0, usuario_id: 0, descricao: '', n_desenvolvimento: '', unid_medida: 'L', periodo: []}) => {
    try {
        const [startDate, endDate] = query.periodo? [`${query.periodo[0]} 00:00:00`, `${query.periodo[1]} 23:59:59`] : [null, null];

        if(query.periodo){
            delete query.periodo;
        }
        const keys = Object.keys(query);
        const values = Object.values(query).map(value => `%${value}%`);

        const whereClause = keys.map(key => { return key ==='unid_medida' ? `registros_producao.${key} LIKE ?` : `${key} LIKE ?`; }).join(' AND ');
        const sql = `
            SELECT
                registros_producao.id,
                registros_producao.quantidade,
                registros_producao.unid_medida,
                registros_producao.tanque,
                registros_producao.createdAt    AS data_registro,
                registros_producao.produto_id,                
                produtos.descricao              AS produto_descricao,
                produtos.n_desenvolvimento      AS produto_n_desenvolvimento,
                registros_producao.usuario_id   AS usuario_id,
                usuario.nome                    AS usuario_criador_nome,
                registros_producao.lote_pa,
                registros_producao.codigo,                
                registros_producao.data_inspecao,
                registros_producao.inspecionado_por,
                registros_producao.validado_por,
                registros_producao.data_separacao,
                registros_producao.hora_separacao,
                registros_producao.responsavel_separacao,
                registros_producao.data_inicio_envase,
                registros_producao.data_fim_envase,
                registros_producao.responsavel_linha_envase,
                registros_producao.amostra_laboratorio,
                registros_producao.responsavel_laboratorio,
                registros_producao.separado_operador,
                registros_producao.hora_inicio,
                registros_producao.data_inicio,
                registros_producao.hora_final,
                registros_producao.data_final,
                registros_producao.conferido_por,
                registros_producao.nome_responsavel_laboratorio,
                registros_producao.volumes_embalagens,
                registros_producao.observacao,
                registros_producao.op_extra,
                registros_producao.orde_servico
            from
                usuario
                    JOIN
                registros_producao ON registros_producao.usuario_id = usuario.id
                    JOIN
                produtos ON registros_producao.produto_id = produtos.id
            WHERE
                registros_producao.deletedAt IS NULL 
                ${whereClause ? ` AND ${whereClause}` : ''}
                ${startDate && endDate ? ` AND registros_producao.createdAt BETWEEN ? AND ?` : ''}
            ORDER BY registros_producao.updatedAt DESC;
        `;
        const [rows] = await pool.query(sql, [...values, startDate, endDate]);
        return rows;
    } catch (error) {
        throw new AppError({
            title: 'Erro ao listar registros de produção',
            message: 'Não foi possível consultar os registros de produção. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const listarDeletados = async () => {
    try {
        const sql = `
            SELECT
                registros_producao.id,
                registros_producao.quantidade,
                registros_producao.unid_medida,
                registros_producao.tanque,
                registros_producao.createdAt    AS data_registro,
                registros_producao.produto_id,                
                produtos.descricao              AS produto_descricao,
                produtos.n_desenvolvimento      AS produto_n_desenvolvimento,
                registros_producao.usuario_id   AS usuario_id,
                usuario.nome                    AS usuario_criador_nome,
                registros_producao.lote_pa,
                registros_producao.codigo,                
                registros_producao.data_inspecao,
                registros_producao.inspecionado_por,
                registros_producao.validado_por,
                registros_producao.data_separacao,
                registros_producao.hora_separacao,
                registros_producao.responsavel_separacao,
                registros_producao.data_inicio_envase,
                registros_producao.data_fim_envase,
                registros_producao.responsavel_linha_envase,
                registros_producao.amostra_laboratorio,
                registros_producao.responsavel_laboratorio,
                registros_producao.separado_operador,
                registros_producao.hora_inicio,
                registros_producao.data_inicio,
                registros_producao.hora_final,
                registros_producao.data_final,
                registros_producao.conferido_por,
                registros_producao.nome_responsavel_laboratorio,
                registros_producao.volumes_embalagens,
                registros_producao.observacao,
                registros_producao.op_extra,
                registros_producao.orde_servico,
                registros_producao.usuario_id   AS usuario_id_criador,
                registros_producao.deletedBy    AS usuario_id_deletor,
                usuario.nome                    AS usuario_deletor_nome
            from
                usuario
                    JOIN
                registros_producao ON registros_producao.deletedBy = usuario.id
                    JOIN
                produtos ON registros_producao.produto_id = produtos.id
            WHERE
                registros_producao.deletedAt IS NOT NULL
            ORDER BY registros_producao.updatedAt DESC;
        `;
        
        const [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        throw new AppError({
            title: 'Erro ao listar registros deletados',
            message: 'Não foi possível consultar os registros de produção excluídos. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};
       
export const consultarPorId = async (id) => {
    try {
        const sql = `
            SELECT
                registros_producao.id,
                registros_producao.quantidade,
                registros_producao.unid_medida,
                registros_producao.tanque,
                registros_producao.createdAt    AS data_registro,
                registros_producao.produto_id,                
                produtos.descricao              AS produto_descricao,
                produtos.n_desenvolvimento      AS produto_n_desenvolvimento,
                registros_producao.usuario_id   AS usuario_id,
                usuario.nome                    AS usuario_criador_nome,
                registros_producao.lote_pa,
                registros_producao.codigo,                
                registros_producao.data_inspecao,
                registros_producao.inspecionado_por,
                registros_producao.validado_por,
                registros_producao.data_separacao,
                registros_producao.hora_separacao,
                registros_producao.responsavel_separacao,
                registros_producao.data_inicio_envase,
                registros_producao.data_fim_envase,
                registros_producao.responsavel_linha_envase,
                registros_producao.amostra_laboratorio,
                registros_producao.responsavel_laboratorio,
                registros_producao.separado_operador,
                registros_producao.hora_inicio,
                registros_producao.data_inicio,
                registros_producao.hora_final,
                registros_producao.data_final,
                registros_producao.conferido_por,
                registros_producao.nome_responsavel_laboratorio,
                registros_producao.volumes_embalagens,
                registros_producao.observacao,
                registros_producao.op_extra,
                registros_producao.orde_servico
            from
                usuario
                    JOIN
                registros_producao ON registros_producao.usuario_id = usuario.id
                    JOIN
                produtos ON registros_producao.produto_id = produtos.id
            WHERE
                registros_producao.deletedAt IS NULL AND registros_producao.id = ?;
        `;
        const [rows] = await pool.query(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new AppError({
            title: 'Erro ao consultar registro de produção',
            message: 'Não foi possível consultar o registro de produção pelo ID informado. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const atualizar = async (id, registros_producao={}) => {
    try {
        await pool.query('UPDATE registros_producao SET ? WHERE id = ?', [registros_producao, id]); 
        return await consultarPorId(id);
        
    } catch (error) {
        throw new AppError({
            title: 'Erro ao atualizar registro de produção',
            message: 'Não foi possível atualizar o registro de produção. Verifique os dados fornecidos e tente novamente.',
            details: error.message,
            code: 500
        });
    }
};

export const deletar = async (id, loginId) => {
    try {
        const [result] = await pool.query('UPDATE registros_producao SET deletedAt = NOW(), deletedBy = ? WHERE id = ? AND deletedAt IS NULL', [loginId, id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new AppError({
            title: 'Erro ao deletar registro de produção',
            message: 'Não foi possível excluir o registro de produção. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

