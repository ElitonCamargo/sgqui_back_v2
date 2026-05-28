import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async ({ nome='', formula='', visivel=true }) => {    
    try {
        const cmdSql = 'INSERT INTO nutriente (nome, formula, visivel) VALUES (?, ?, ?);';
        const [result] = await pool.execute(cmdSql, [nome, formula, visivel]);
        return await consultarPorId(result.insertId);   
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao cadastrar nutriente',
            message: 'Não foi possível cadastrar o nutriente. Verifique se há duplicidade de nome ou fórmula, ou se os dados são inválidos.',
            details: error.message,
            code: 500
        });
    }
};

export const alterar = async (id, nutriente={}) => {
    try {

        const keys = Object.keys(nutriente);
        const values = Object.values(nutriente);
        const setClause = keys.map(k => `${k} = ?`).join(', ');

        const sql = `
        UPDATE nutriente
        SET ${setClause}, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ? `;  
        
        const [result] = await pool.execute(sql, [...values, id]);
        if(result.affectedRows === 0){
            return null;
        }

        return await consultarPorId(id);

    } catch (error) {
        throw new AppError({
            title: 'Erro ao alterar nutriente',
            message: 'Não foi possível alterar o nutriente. Verifique se o ID existe e se os dados fornecidos são válidos.',
            details: error.message,
            code: 500
        });
    }
};

export const consultar = async (filtro = '') => {
    try {  
        const cmdSql = 'SELECT * FROM nutriente WHERE nome LIKE ? or formula LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`,`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar nutrientes',
            message: 'Não foi possível consultar a lista de nutrientes. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM nutriente WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0];
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar nutriente',
            message: 'Não foi possível consultar o nutriente pelo ID informado. Verifique se o ID é válido.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarPorNome = async (nome) => {
    try {
        const cmdSql = 'SELECT * FROM nutriente WHERE nome like ?;';
        const [dados] = await pool.execute(cmdSql, [nome]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar nutriente',
            message: 'Não foi possível consultar o nutriente pelo nome informado. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarPorFormula = async (formula) => {
    try {
        const cmdSql = 'SELECT * FROM nutriente WHERE formula like ?;';
        const [dados] = await pool.execute(cmdSql, [formula]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar nutriente',
            message: 'Não foi possível consultar o nutriente pela fórmula química informada. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM nutriente WHERE id = ?;';
        const [result] = await pool.execute(cmdSql, [id]);
        return result.affectedRows > 0;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao deletar nutriente',
            message: 'Não foi possível excluir o nutriente. O registro pode não existir ou possuir garantias vinculadas que impedem a exclusão.',
            details: error.message,
            code: 500
        });
    }
};
