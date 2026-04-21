import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (nutriente={}) => {    
    try {
        let valores = [];
        let campos = '';
        let placeholders = '';
        
        for(const key in nutriente){
            campos += `${key},`;            
            placeholders += '?,';
            valores.push(nutriente[key]);            
        }
        campos = campos.slice(0, -1);
        placeholders = placeholders.slice(0, -1);
        const cmdSql = `INSERT INTO nutriente (${campos}) VALUES (${placeholders});`;        
        await pool.execute(cmdSql, valores);

        const [result] = await pool.execute('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados] = await pool.execute('SELECT * FROM nutriente WHERE id = ?;', [lastId]);
        return dados;
    } 
    catch (error) {
        throw new AppError('Erro ao cadastrar nutriente', error.message, 500);
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
        
        await pool.execute(sql, [...values, id]);
        return await consultarPorId(id);

    } catch (error) {
        throw new AppError('Erro ao alterar nutriente', error.message, 500);
    }
};

export const consultar = async (filtro = '') => {
    try {  
        const cmdSql = 'SELECT * FROM nutriente WHERE nome LIKE ? or formula LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`,`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw new AppError('Erro ao consultar nutrientes', error.message, 500);
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM nutriente WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError('Erro ao consultar nutriente por ID', error.message, 500);
    }
};

export const consultarPorNome = async (nome) => {
    try {
        const cmdSql = 'SELECT * FROM nutriente WHERE nome like ?;';
        const [dados] = await pool.execute(cmdSql, [nome]);
        return dados;
    } 
    catch (error) {
        throw new AppError('Erro ao consultar nutriente por nome', error.message, 500);
    }
};

export const consultarPorFormula = async (formula) => {
    try {
        const cmdSql = 'SELECT * FROM nutriente WHERE formula like ?;';
        const [dados] = await pool.execute(cmdSql, [formula]);
        return dados;
    } 
    catch (error) {
        throw new AppError('Erro ao consultar nutriente por fórmula', error.message, 500);
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM nutriente WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError('Erro ao deletar nutriente', error.message, 500);
    }
};

