import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

/**
 * Cadastra uma etapa de matéria-prima na tabela `etapa_mp`.
 *
 * @async
 * @function cadastrar
 * @param {Object} etapa_mp Dados para cadastro.
 * @param {number|string} etapa_mp.etapa Etapa vinculada ao registro.
 * @param {number|string} etapa_mp.mp Matéria-prima vinculada ao registro.
 * @param {number} etapa_mp.percentual Percentual da matéria-prima.
 * @param {number} etapa_mp.tempo_agitacao Tempo de agitação.
 * @param {string} etapa_mp.observacao Observação do registro.
 * @param {number} etapa_mp.ordem Ordem de execução.
 * @param {string|number} etapa_mp.lote Identificação do lote.
 * @returns {Promise<Object[]>} Objeto completo gravado no banco:
 * [{
 *   id,
 *   etapa,
 *   mp,
 *   percentual,
 *   tempo_agitacao,
 *   observacao,
 *   ordem,
 *   lote,
 *   createdAt,
 *   updatedAt
 * }].
 */
export const cadastrar = async (etapa_mp) => {    
    try {
        const keys = Object.keys(etapa_mp);
        const values = Object.values(etapa_mp);

        const setCollumns = keys.join(', ');
        const setClause = keys.map(() => '?').join(', ');

        const cmdSql = `INSERT INTO etapa_mp (${setCollumns}) VALUES (${setClause});`;
        const [result] = await pool.execute(cmdSql, values);

        return await consultarPorId(result.insertId);
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao cadastrar etapa de matéria-prima',
            reason: `Falha na execução do INSERT na tabela 'etapa_mp'; verifique se a etapa e a matéria-prima informadas existem e se os dados são válidos. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const alterar = async (id,etapa_mp) => {
    try {
        const keys = Object.keys(etapa_mp);
        const values = Object.values(etapa_mp);
        const setClause = keys.map(key => `${key} = ?`).join(', ');

        const cmdSql = `UPDATE etapa_mp SET ${setClause} WHERE id = ?;`;
        const [result] = await pool.execute(cmdSql, [...values, id]);
        if (result.affectedRows === 0) {
            return null; // Nenhum registro atualizado, possivelmente ID não existe
        }
        return await consultarPorId(id);

    }
    catch (error) {
        throw new AppError({
            message: 'Erro ao alterar etapa de matéria-prima',
            reason: `Falha na execução do UPDATE na tabela 'etapa_mp'; verifique se o registro existe e se os dados fornecidos são compatíveis com o esquema. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const alterarOrdem = async (ordemEtapaMP = []) => {

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const results = [];

        for (const { id, etapa, ordem } of ordemEtapaMP) {
            const cmdSql = `UPDATE etapa_mp SET etapa = ?, ordem = ? WHERE id = ?`;

            const [result] = await connection.execute(cmdSql, [etapa, ordem, id]);

            if (result.affectedRows === 0) {
                throw new AppError({
                    message: 'Matéria-prima não encontrada para reordenação',
                    reason: `Nenhuma matéria-prima na etapa foi encontrada com o ID ${id} informado para alteração de ordem.`,
                    code: 404
                });
            }

            results.push({id, etapa,ordem});
        }

        await connection.commit();

        return results;

    } catch (error) {
        await connection.rollback();

        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError({
            message: 'Erro ao alterar ordem das etapas',
            reason: `Falha na execução do UPDATE para reordenar as etapas; verifique se os IDs fornecidos são válidos e se a estrutura do array está correta. Detalhe: ${error.message}`,
            code: 500
        });

    } finally {
        connection.release();
    }
};

export const consultar = async (filtro = '') => {
    try {  
        const cmdSql = 'SELECT * FROM etapa_mp WHERE observacao LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`]);
        return dados;
    } 
    catch (error) {    
        throw new AppError({
            message: 'Erro ao consultar etapas de matéria-prima',
            reason: `Falha na execução do SELECT na tabela 'etapa_mp'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

/**
 * Consulta uma etapa de matéria-prima pelo ID.
 *
 * @async
 * @function consultarPorId
 * @param {number|string} id Identificador único do registro em `etapa_mp`.
 * @returns {Promise<Object|null>} Registro encontrado ou `null` quando inexistente:
 * {
 *   id,
 *   etapa,
 *   mp,
 *   percentual,
 *   tempo_agitacao,
 *   observacao,
 *   ordem,
 *   lote,
 *   createdAt,
 *   updatedAt
 * }.
 */
export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM etapa_mp WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0] || null;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar etapa de matéria-prima por ID',
            reason: `Falha na execução do SELECT na tabela 'etapa_mp' filtrando por ID; verifique se o ID fornecido é válido. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorEtapa = async (etapa_id) => {
    try {
        const cmdSql = 'SELECT * FROM etapa_mp WHERE etapa = ? ORDER BY ordem ASC;';
        const [dados] = await pool.execute(cmdSql, [etapa_id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar etapas de matéria-prima por etapa',
            reason: `Falha na execução do SELECT na tabela 'etapa_mp' filtrando pelo ID da etapa pai; verifique se a etapa informada existe. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM etapa_mp WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados.affectedRows > 0;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao deletar etapa de matéria-prima',
            reason: `Falha na execução do DELETE na tabela 'etapa_mp'; o registro pode não existir ou possuir dependências que impedem a exclusão. Detalhe: ${error.message}`,
            code: 500
        });
    }
};