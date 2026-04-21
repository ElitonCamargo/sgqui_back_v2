import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (etapa_mp={}) => {    
    try {
        let valores = [];
        let campos = '';
        let placeholders = '';
        
        for(const key in etapa_mp){
            campos += `${key},`;            
            placeholders += '?,';
            valores.push(etapa_mp[key]);            
        }
        campos = campos.slice(0, -1);
        placeholders = placeholders.slice(0, -1);
        const cmdSql = `INSERT INTO etapa_mp (${campos}) VALUES (${placeholders});`;        
        await pool.execute(cmdSql, valores);

        const [result] = await pool.execute('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados] = await pool.execute('SELECT * FROM etapa_mp WHERE id = ?;', [lastId]);
        return dados;
    } 
    catch (error) {
        throw new AppError('Erro ao cadastrar etapa de matéria-prima', error.message, 500);
    }
};

export const alterar = async (etapa_mp={}) => {
    try {
        let valores = [];
        let cmdSql = 'UPDATE etapa_mp SET ';

        for(const key in etapa_mp){
            valores.push(etapa_mp[key]);
            cmdSql += `${key} = ?, `;
        }

        cmdSql = cmdSql.replace(', id = ?,', '');
        cmdSql += 'WHERE id = ?;';
        const [execucao] = await pool.execute(cmdSql, valores);
        if(execucao.affectedRows > 0){
            const [dados] = await pool.execute('SELECT * FROM etapa_mp WHERE id = ?;', etapa_mp.id);
            return dados;
        }
        return [];

    }
    catch (error) {
        throw new AppError('Erro ao alterar etapa de matéria-prima', error.message, 500);
    }
};

export const consultar = async (filtro = '') => {
    try {  
        const cmdSql = 'SELECT * FROM etapa_mp WHERE observacao LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw new AppError('Erro ao consultar etapas de matéria-prima', error.message, 500);
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM etapa_mp WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError('Erro ao consultar etapa de matéria-prima por ID', error.message, 500);
    }
};

export const consultarPorEtapa = async (etapa_id) => {
    try {
        const cmdSql = 'SELECT * FROM etapa_mp WHERE etapa_id = ?;';
        const [dados] = await pool.execute(cmdSql, [etapa_id]);
        return dados;
    } 
    catch (error) {
        throw new AppError('Erro ao consultar etapas de matéria-prima por etapa', error.message, 500);
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM etapa_mp WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError('Erro ao deletar etapa de matéria-prima', error.message, 500);
    }
};
