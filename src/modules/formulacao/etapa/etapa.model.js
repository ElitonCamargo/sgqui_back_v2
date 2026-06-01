import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (etapa={}) => {    
    try {

        const campos = Object.keys(etapa).join(', ');
        const valores = Object.values(etapa);

        const placeholders = valores.map(() => '?').join(', ');

        const cmdSql = `INSERT INTO etapa (${campos}) VALUES (${placeholders});`; 

        const [result] = await pool.execute(cmdSql, valores);
        const lastId = result.insertId;

        return await consultarPorId(lastId);
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao cadastrar etapa',
            message: 'Não foi possível cadastrar a etapa. Verifique se o projeto informado existe e se os dados são válidos.',
            details: error.message,
            code: 500
        });
    }
};

export const alterar = async (id=0, etapa={}) => {
    try {
        const keys = Object.keys(etapa);
        const values = Object.values(etapa);
        const placeholders = keys.map(key => `${key} = ?`).join(', ');

        const cmdSql = `UPDATE etapa SET ${placeholders} WHERE id = ?;`;

        const [result] = await pool.execute(cmdSql, [...values, id]);
        return result.affectedRows > 0 ? await consultarPorId(id) : null;
    }
    catch (error) {
        throw new AppError({
            title: 'Erro ao alterar etapa',
            message: 'Não foi possível alterar a etapa. Verifique se o registro existe e se os dados fornecidos são válidos.',
            details: error.message,
            code: 500
        });
    }
};


export const alterarOrdem = async (ordemEtapa = []) => {

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const results = [];

        for (const { id, ordem } of ordemEtapa) {
            const cmdSql = `
                UPDATE etapa 
                SET ordem = ? 
                WHERE id = ?;
            `;

            const [result] = await connection.execute(cmdSql, [ordem, id]);

            if (result.affectedRows === 0) {
                throw new AppError({
                    title: 'Erro ao reordenar etapas',
                    message: 'Não foi possível reordenar a etapa informada.',
                    details: `Nenhuma etapa encontrada para reordenação com o ID ${id}.`,
                    code: 404
                });
            }

            results.push({
                id,
                ordem
            });
        }

        await connection.commit();

        return results;

    } catch (error) {
        await connection.rollback();

        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError({
            title: 'Erro ao reordenar etapas',
            message: 'Não foi possível reordenar as etapas. Verifique se os IDs fornecidos são válidos.',
            details: error.message,
            code: 500
        });

    } finally {
        connection.release();
    }
};


export const consultar = async (filtro = '') => {
    try {  
        const cmdSql = 'SELECT * FROM etapa WHERE nome LIKE ? or descricao LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`,`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar etapas',
            message: 'Não foi possível consultar a lista de etapas. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM etapa WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0] || null;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar etapa',
            message: 'Não foi possível consultar a etapa pelo ID informado. Verifique se o ID é válido.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarPorNome = async (nome) => {
    try {
        const cmdSql = 'SELECT * FROM etapa WHERE nome like ?;';
        const [dados] = await pool.execute(cmdSql, [nome]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar etapa',
            message: 'Não foi possível consultar a etapa pelo nome informado. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarPorProjeto = async (projeto_id) => {
    try {
        const cmdSql = 'SELECT * FROM etapa WHERE projeto = ?;';
        const [dados] = await pool.execute(cmdSql, [projeto_id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar etapas do projeto',
            message: 'Não foi possível consultar as etapas do projeto informado. Verifique se o projeto existe.',
            details: error.message,
            code: 500
        });
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM etapa WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados.affectedRows > 0;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao deletar etapa',
            message: 'Não foi possível excluir a etapa. O registro pode não existir ou possuir matérias-primas vinculadas que impedem a exclusão.',
            details: error.message,
            code: 500
        });
    }
};
