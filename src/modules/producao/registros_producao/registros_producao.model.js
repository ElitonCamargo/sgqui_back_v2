import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (registro_producao={
    produto_id: 0,
    usuario_id: 0,
    quantidade: 0,
    unid_medida: 'L',
    tanque: '',
    observacao: ''
}) => {
    try {
        const [result] = await pool.query('INSERT INTO registros_producao SET ?', [registro_producao]);
       return await consultarPorId(result.insertId);
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao cadastrar registro de produção',
            reason: `Falha na execução do INSERT na tabela 'registros_producao'; verifique os dados fornecidos. Detalhe: ${error.message}`,
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
                registros_producao.id           AS id,
                registros_producao.quantidade   AS quantidade,
                registros_producao.unid_medida  AS unid_medida,
                registros_producao.tanque       AS tanque,
                registros_producao.observacao   AS observacao,
                registros_producao.createdAt    AS data_registro,
                registros_producao.produto_id   AS produto_id,
                produtos.descricao              AS produto_descricao,
                produtos.n_desenvolvimento      AS produto_n_desenvolvimento,
                registros_producao.usuario_id   AS usuario_id,
                usuario.nome                    AS usuario_criador_nome
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
            message: 'Erro ao listar registros de produção',
            reason: `Falha na execução do SELECT na tabela 'registros_producao'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const listarDeletados = async () => {
    try {
        const sql = `
            SELECT
                registros_producao.id           AS id,
                registros_producao.quantidade   AS quantidade,
                registros_producao.unid_medida  AS unid_medida,
                registros_producao.tanque       AS tanque,
                registros_producao.observacao   AS observacao,
                registros_producao.createdAt    AS data_registro,
                registros_producao.produto_id   AS produto_id,
                produtos.descricao              AS produto_descricao,
                produtos.n_desenvolvimento      AS produto_n_desenvolvimento,
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
            message: 'Erro ao listar registros de produção deletados',
            reason: `Falha na execução do SELECT na tabela 'registros_producao'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};
       
export const consultarPorId = async (id) => {
    try {
        const sql = `
            SELECT
                registros_producao.id           AS id,
                registros_producao.quantidade   AS quantidade,
                registros_producao.unid_medida  AS unid_medida,
                registros_producao.tanque       AS tanque,
                registros_producao.observacao   AS observacao,
                registros_producao.createdAt    AS data_registro,
                registros_producao.produto_id   AS produto_id,
                produtos.descricao              AS produto_descricao,
                produtos.n_desenvolvimento      AS produto_n_desenvolvimento,
                registros_producao.usuario_id   AS usuario_id,
                usuario.nome                    AS usuario_criador_nome
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
            message: 'Erro ao obter registro de produção',
            reason: `Falha na execução do SELECT na tabela 'registros_producao'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
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
            message: 'Erro ao atualizar registro de produção',
            reason: `Falha na execução do UPDATE na tabela 'registros_producao'; verifique os dados fornecidos e a conectividade com o banco de dados. Detalhe: ${error.message}`,
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
            message: 'Erro ao deletar registro de produção',
            reason: `Falha na execução do SOFT DELETE na tabela 'registros_producao'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

